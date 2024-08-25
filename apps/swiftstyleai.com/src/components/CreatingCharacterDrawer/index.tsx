'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useUser } from '@/contexts/auth/AuthProvider';
import { createCharacter } from '@/db/characters/browser';
import { Tables } from '@/db/types';

import formSchema from './form-schema';

export type Character = Tables<'characters'>;

const defaultValues = {
  name: '',
  description: '',
};

// const id = 'creating-workspace';

type FormSchemaType = z.infer<typeof formSchema>;

export interface CreatingCharacterDrawerProps {
  open: boolean;
  onCreatedWorkspace?: (Character: Character) => void;
  onOpenDrawer?: () => void;
  onCloseDrawer?: () => void;
}

const CreatingCharacterDrawer = ({
  open,
  onCreatedWorkspace,
  onOpenDrawer,
  onCloseDrawer,
}: CreatingCharacterDrawerProps) => {
  const route = useRouter();
  const { user } = useUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = form;

  const onOpenChange = React.useCallback(
    (state: boolean) => {
      if (state !== open && onOpenDrawer && onCloseDrawer) {
        state ? onOpenDrawer() : onCloseDrawer();
      }
    },
    [open, onCloseDrawer, onOpenDrawer]
  );

  const onSubmit: SubmitHandler<FormSchemaType> = React.useCallback(
    async (data: FormSchemaType) => {
      // FIXME: handling if user not logged in
      if (!user) return;

      const res = await createCharacter({
        name: data.name,
        description: data.description,
      });

      // const workspace = generateWorkspace({
      //   id: res.id,
      //   name: res.name,
      //   description: res.description,
      // });

      onCreatedWorkspace && onCreatedWorkspace(res);
      onCloseDrawer && onCloseDrawer();
      route.push(`/characters/${res.id}`);
    },
    [user, route, onCreatedWorkspace, onCloseDrawer]
  );

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      // const { list, data } = stateWorkspaces;
      // const latestWorkspace
      // const s = slug(getValues('name'));

      reset(defaultValues);

      // route.push(`/?w=${s}`);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New character</SheetTitle>
            <SheetDescription>Creating new character</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form className='py-4' onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Name' {...field} />
                    </FormControl>
                    {/* <FormDescription>
                            This is your public display name.
                          </FormDescription> */}
                    <FormMessage className='text-red-600 dark:text-red-500' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Describe your new character'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-600 dark:text-red-500' />
                  </FormItem>
                )}
              />

              {/* <div className='px-4 py-2'>
                    <div
                      className='p-4 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500'
                      role='alert'
                    >
                      <span className='font-bold'>Danger</span> alert! You
                      should check in on some of those fields below.
                    </div>
                  </div> */}

              <SheetFooter className='sm:justify-start'>
                <Button type='submit' disabled={!isValid}>
                  Submit
                </Button>
                <SheetClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreatingCharacterDrawer;
