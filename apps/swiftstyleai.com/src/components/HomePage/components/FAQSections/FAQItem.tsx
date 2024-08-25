'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export interface FAQItemProps {
  question: string;
  answer: string;
  isOpenByDefault: boolean;
}

export default function FAQItem({
  question,
  answer,
  isOpenByDefault,
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-full space-y-2 py-6 first:pt-0'
    >
      <div className='flex items-center justify-between space-x-4'>
        <h4 className='text-sm md:text-lg font-semibold text-gray-800 dark:text-neutral-200'>
          {question}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm' className='w-9 p-0'>
            <ChevronsUpDown className='h-4 w-4 text-gray-600 dark:text-neutral-400' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <p className='text-gray-600 dark:text-neutral-400'>{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
