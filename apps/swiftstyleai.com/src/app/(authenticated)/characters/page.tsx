'use client';

import { PlusCircle } from 'lucide-react';
import React, { useCallback } from 'react';

import { Link } from '@/lib/react-transition-progress/next';

import FetchCharacters from '@/components/CharactersPage/containers/FetchCharacters';
import Main from '@/components/CharactersPage/containers/Main';
import { CharactersProvider } from '@/components/CharactersPage/contexts';
import { DeletingCharacterDialogProvider } from '@/components/DeletingCharacterDialog/contexts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { useAppContext } from '@/contexts/app';
import { withPrivateRoute } from '@/contexts/auth/withPrivateRoute';

import Header from '../components/Header';

function Page() {
  const { openCreatingCharacterDrawer } = useAppContext();

  const onClick = useCallback(() => {
    openCreatingCharacterDrawer && openCreatingCharacterDrawer();
  }, [openCreatingCharacterDrawer]);

  return (
    <DeletingCharacterDialogProvider>
      <CharactersProvider>
        <div className='pageContent page-content page-content-height ng-tns-c31-0'>
          <Header
            title={
              <>
                <div className='flex flex-col space-y-0.5'>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href='/dashboard'>Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <h1 className='text-xl font-semibold'>Characters</h1>
                </div>
                <div className='relative ml-auto flex-1 md:grow-0'></div>
                <Button className='gap-1' onClick={onClick}>
                  <PlusCircle className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Add Characters
                  </span>
                </Button>
              </>
            }
          />

          <Main />
        </div>
        <FetchCharacters />
      </CharactersProvider>
    </DeletingCharacterDialogProvider>
  );
}

export default withPrivateRoute(Page);
