'use client';

import React, { useMemo } from 'react';

import { HttpStatus } from '@/lib/constants';
import { Link } from '@/lib/react-transition-progress/next';

import FetchInstructions from '@/components/CharactersIDPage/containers/FetchInstructions';
import Main from '@/components/CharactersIDPage/containers/Main';
import { useCharactersIDContext } from '@/components/CharactersIDPage/contexts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '../../components/Header';
import { withPrivateRoute } from '@/contexts/auth/withPrivateRoute';

const Page = () => {
  const { state: { character, fetchStatus } } = useCharactersIDContext();

  const headerTitle = useMemo(() => {
    if (fetchStatus === HttpStatus.LOADED) {
      return <h1 className='text-xl font-semibold'>{character?.name}</h1>;
    }
    if (fetchStatus === HttpStatus.LOADING) {
      return <Skeleton className='h-4 w-[100px]' />;
    }
    return null;
  }, [fetchStatus, character]);

  return (
    <>
      <div className='pageContent page-content page-content-height ng-tns-c31-0'>
        <Header
          title={
            <div className='flex flex-col space-y-0.5'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href='/dashboard'>Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href='/characters'>Characters</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              {headerTitle}
            </div>
          }
        />
        <Main />
      </div>
      <FetchInstructions />
    </>
  );
};

export default withPrivateRoute(Page);
