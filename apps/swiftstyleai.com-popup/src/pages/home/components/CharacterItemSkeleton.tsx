// import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CharacterItemSkeleton = () => {
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-[230px]" />
          <Skeleton className="h-4 w-[270px] mt-2" />
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          <Skeleton className="h-[25px] w-[45px] rounded-xl" />
        </div>
      </div>
    </li>
  );
};

export default CharacterItemSkeleton;
