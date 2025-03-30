"use client";

import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModels";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter, useParams } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { useUser } from "@clerk/nextjs";

function CreateNewContent() {
    const params = useParams(); // Ensure params is used correctly
    const router = useRouter();
    const { user } = useUser();
    const { totalUsage } = useContext(TotalUsageContext);
    const { userSubscription } = useContext(UserSubscriptionContext);
    const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
    
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>("");
    
    const selectedTemplate: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug === params["template-slug"]
    );
    
    const GenerateAIContent = async (formData: any) => {
        if (totalUsage >= 10000 && !userSubscription) {
            console.log("Please Upgrade");
            router.push("/dashboard/billing");
            return;
        }

        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);

        const responseText = await result?.response.text();
        setAiOutput(responseText);

        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, responseText);
        setLoading(false);

        if (setUpdateCreditUsage) {
            setUpdateCreditUsage(Date.now());
        }
    };

    const SaveInDb = async (formData: string, slug: string | undefined, aiResp: string) => {
        if (!slug) return;
        await db.insert(AIOutput).values({
            formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
        });
    };

    return (
        <div className="p-5">
            <Link href="/dashboard">
                <Button>
                    <ArrowLeft /> Back
                </Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
                <FormSection 
                    selectedTemplate={selectedTemplate} 
                    userFormInput={(v: any) => GenerateAIContent(v)} 
                    loading={loading} 
                />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    );
}

export default CreateNewContent;