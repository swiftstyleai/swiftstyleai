import { CircleUser } from 'lucide-react';

import ColorLogo from '@/components/logo/ColorLogo';
import { Button } from '@/components/ui/button';

const createSymbol = (name: string) => `playground-app/${name}`;

export const SEND_MESSAGE_REQUEST = createSymbol('SEND_MESSAGE_REQUEST');
export const SEND_MESSAGE_SUCCESS = createSymbol('SEND_MESSAGE_SUCCESS');
export const SEND_MESSAGE_FAILURE = createSymbol('SEND_MESSAGE_FAILURE');

export const LOGO_APP = (
  <Button variant='ghost' size='icon' className='rounded-full'>
    <ColorLogo width={44} height={44} animation='breath' />
    <span className='sr-only'>AI</span>
  </Button>
);

export const LOGO_USER = (
  <Button variant='outline' size='icon' className='rounded-full'>
    <CircleUser className='h-5 w-5' />
    <span className='sr-only'>User</span>
  </Button>
);
