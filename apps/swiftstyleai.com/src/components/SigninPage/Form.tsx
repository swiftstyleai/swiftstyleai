'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';

// import { useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import formSchema from './form-schema';
import { Button } from '../ui/button';

const defaultValues = {
  email: '',
};

// const id = 'login-form';

type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginForm() {
  // const searchParams = useSearchParams();
  const supabase = createClient();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  // const opened = searchParams.get('opened');

  const onSubmit: SubmitHandler<FormSchemaType> = async (
    data: FormSchemaType
  ) => {
    // const { error } = await supabase.auth.signInWithPassword(data);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/dashboard`,
        // opened === 'extension'
        //   ? `${window.location.origin}/logged-in-via-extension`
        //   : `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    } else {
      reset(defaultValues);
      toast({
        title: "You're Almost There!",
        description:
          'Just one more step! Please check your email to log in and start using our service.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Email address'
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-600 dark:text-red-500' />
            </FormItem>
          )}
        />

        <div className='grid gap-y-4'>
          <Button
            className='w-full py-3 px-4 inline-flex justify-center items-center'
            type='submit'
            disabled={isSubmitting || !isValid}
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
