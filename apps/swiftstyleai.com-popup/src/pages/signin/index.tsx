import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_URL } from '@/constants';
import Header from './components/Header';

const PageSignIn = () => {
  return (
    <main className="px-4 w-full h-full flex flex-col flex-nowrap justify-center items-left">
      <Header />
      <h2 className="text-lg text-left font-semibold">
        Sign up now to unlock the following:
      </h2>

      <ul className="mt-7 max-w-md space-y-1 list-inside text-sm text-left">
        <li className="flex items-center">
          <Check className="me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
          Get 300 free prompts monthly
        </li>
        <li className="flex items-center">
          <Check className="me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
          Customize various character free
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
    </main>
  );
};

export default PageSignIn;
