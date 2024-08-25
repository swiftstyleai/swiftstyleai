'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { updateCharacterDetails } from '@/db/characters/browser';

import formSchema from './form-schema';
import { useCharactersIDContext } from '../../contexts';

type FormSchemaType = z.infer<typeof formSchema>;

export default function InfoCardForm() {
  const { state: stateInstructions, updateCharacter } =
    useCharactersIDContext();
  const { character } = stateInstructions;
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: React.useMemo(
      () => ({
        name: character?.name ?? '',
        description: character?.description ?? '',
      }),
      [character]
    ),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit: SubmitHandler<FormSchemaType> = async (
    data: FormSchemaType
  ) => {
    try {
      if (!character) {
        throw new Error('not found data');
      }
      const updatedCharacter = await updateCharacterDetails(
        character.id,
        data.name,
        data.description
      );
      if (updateCharacter) {
        updateCharacter(updatedCharacter);
      }
      toast({
        title: 'Update Success',
        description: 'Character details have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description:
          (error as Error).message ||
          'An error occurred while updating the character details.',
        variant: 'destructive',
      });
    }
  };

  React.useEffect(() => {
    reset({
      name: character?.name ?? '',
      description: character?.description ?? '',
    });
  }, [character, reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='mt-2'>
          <CardHeader>
            <CardTitle>Info</CardTitle>
            <CardDescription>Update character details</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Name'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
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
                    <Textarea
                      placeholder='Description'
                      disabled={isSubmitting}
                      className='min-h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-600 dark:text-red-500' />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='border-t px-6 py-4'>
            <Button
              type='submit'
              disabled={isSubmitting || !isValid || !isDirty}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
