
import React, { useEffect, useState } from 'react';
import Templates from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
    name: string;
    desc: string;
    category: string;
    icon: string;
    aiPrompt: string;
    slug: string;
    form?: FORM[]
}
export interface FORM{
    label: string;
    field: string;
    name: string;
    required?: boolean
}
// function TemplateListSection({userSearchInput}:any) {
//     const [templateList,setTemplateList] = useState(Templates)
//     useEffect(() => {
        
//         if (userSearchInput) {
//             const filterData = Templates.filter((item:TEMPLATE) => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
//             setTemplateList(filterData)
            
//         }
//         else{
//             setTemplateList(Templates)
//         }

//     },[userSearchInput])
//   return (
//     <div className ='grid grid-cols-3 md:grid-cols-4 gap-5'>
//         { Templates.map((item:TEMPLATE , index:number)=>(
//             <TemplateCard{...item} />
           
//         ))}
//     </div>
//   )
// }

// export default TemplateListSection
interface Props {
    userSearchInput: string;
  }

const TemplateListSection: React.FC<Props> = ({ userSearchInput }) => {
    const [templateList, setTemplateList] = useState<TEMPLATE[]>(Templates); // Initialize state properly
  
    useEffect(() => {
      if (userSearchInput) {
        const filteredData = Templates.filter((item: TEMPLATE) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filteredData);
      } else {
        setTemplateList(Templates);
      }
    }, [userSearchInput]); // Re-run effect when userSearchInput changes
  
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
        {templateList.map((item: TEMPLATE, index: number) => (
          <TemplateCard key={index} {...item} /> // Ensure key is set and templateList is used
        ))}
      </div>
    );
  };
  
  export default TemplateListSection;