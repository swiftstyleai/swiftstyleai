import { Check, X } from 'lucide-react';
import React from 'react';
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { APP_URL } from '@/constants';

export default function LoginReminderPopup(): JSX.Element {
  return (
    <PopoverContent
      side="left"
      align="start"
      sideOffset={0}
      className="w-85 mx-auto"
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Sign up to:
      </h2>
      <ul className="mt-7 max-w-md space-y-1 list-inside text-sm">
        <li className="flex items-center">
          <Check className="me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
          Get 300 free prompts monthly
        </li>
        <li className="flex items-center">
          <Check className="me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
          Customize various characters free
        </li>
        <li className="flex items-center">
          <Check className="me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
          Make friends with creative responses
        </li>
      </ul>

      <div className="mt-5 w-full">
        <Button className="w-full" asChild>
          <a href={`${APP_URL}/signin`} target="_blank" rel="noreferrer">
            Sign up
          </a>
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href={`${APP_URL}/signin`} target="_blank" className="underline" rel="noreferrer">
            Sign in
          </a>
        </div>
      </div>

      <PopoverArrow className="fill-white" />
      <PopoverClose
        className="h-[20px] w-[20px] inline-flex items-center justify-center absolute top-[1rem] right-[.5rem] text-foreground/50 outline-none cursor-pointer"
        aria-label="Close"
      >
        <X />
      </PopoverClose>
    </PopoverContent>
  );
}
