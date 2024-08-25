'use client';

import { PlusCircle } from 'lucide-react';
import React, { useCallback } from 'react';

import FetchCharacters from '@/components/DashboardPage/containers/FetchCharacters';
import Main from '@/components/DashboardPage/containers/Main';
import { DashboardProvider } from '@/components/DashboardPage/contexts';
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
    <DashboardProvider>
      <div className='pageContent ng-tns-c31-0 page-content page-content-height'>
        <Header
          title={
            <>
              <h1 className='text-xl font-semibold'>Home</h1>
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
    </DashboardProvider>
  );
}

export default withPrivateRoute(Page);
