import { Skeleton } from '@/components/ui/skeleton';

const CharacterItemSkeleton = () => {
  return (
    <li className='pb-3 sm:pb-4'>
      <div className='flex items-center space-x-4 rtl:space-x-reverse'>
        <div className='flex-1 min-w-0 grid gap-2'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-4 w-[250px]' />
        </div>
        <div className='inline-flex items-center text-base font-semibold'>
          <Skeleton className='h-6 w-[45px] rounded-xl' />
        </div>
      </div>
    </li>
  );
};

export default CharacterItemSkeleton;
