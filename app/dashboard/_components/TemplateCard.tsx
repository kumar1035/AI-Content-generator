import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image';
import Link from 'next/link';

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/'+item?.slug}>
    <div className="p-5 shadow-lg rounded-xl border bg-white flex flex-col gap-4 cursor-pointer 
    transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      
      <div className="flex justify-center">
        <Image src={item.icon} alt="icon" width={60} height={60} className="rounded-md" />
      </div>

      <h2 className="font-semibold text-xl text-gray-800 text-center">{item.name}</h2>
      
      <p className="text-gray-600 text-center line-clamp-3">
        {item.desc}
      </p>
    </div>
    </Link>
  );
}

export default TemplateCard;
