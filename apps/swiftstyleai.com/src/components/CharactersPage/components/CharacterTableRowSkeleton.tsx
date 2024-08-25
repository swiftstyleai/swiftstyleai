import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

const CharacterTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className='pl-0'>
        <div className='flex-1 min-w-0 grid gap-2'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-4 w-[250px]' />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-[45px] rounded-xl' />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Skeleton className='h-4 w-[150px]' />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Skeleton className='h-4 w-[100px]' />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(CharacterTableRowSkeleton);
