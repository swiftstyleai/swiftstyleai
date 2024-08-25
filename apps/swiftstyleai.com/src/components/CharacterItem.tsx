import { Link } from '@/lib/react-transition-progress/next';

import { Switch } from '@/components/ui/switch';

import { Tables } from '@/db/types';

import { Typography } from './ui/typography';

export type Character = Tables<'characters'>;

export type CharacterItemProps = {
  data: Character;
};

const CharacterItem = ({ data }: CharacterItemProps) => {
  return (
    <li className='pb-3 sm:pb-4'>
      <Link href={`/characters/${data.id}`}>
        <div className='flex items-center space-x-4 rtl:space-x-reverse'>
          <div className='flex-1 min-w-0'>
            <Typography affects='small' className='leading-normal	truncate'>
              {data.name}
            </Typography>
            <Typography className='text-sm truncate'>
              {data.description}
            </Typography>
          </div>
          <div className='inline-flex items-center text-base font-semibold'>
            <Switch checked={data.is_active} disabled />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CharacterItem;
