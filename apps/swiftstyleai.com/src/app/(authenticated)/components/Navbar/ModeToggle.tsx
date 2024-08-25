'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { AvatarAnimation } from '@/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import ListItem from './ListItem';
import ListItemAvatar from './ListItemAvatar';
import ListItemPill from './ListItemPill';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <Tooltip delayDuration={100}>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <ListItem>
              {({ active, hover }: { active: boolean; hover: boolean }) => (
                <>
                  <ListItemPill active={active} hover={hover} />
                  <ListItemAvatar>
                    <AvatarAnimation
                      active={active}
                      hover={hover}
                      className={`
                          inline-flex select-none align-middle
                          h-[48px] w-[48px] items-center justify-center rounded-lg
                      `}
                    >
                      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />

                      <span className='sr-only'>Mode Toggle</span>
                    </AvatarAnimation>
                  </ListItemAvatar>
                </>
              )}
            </ListItem>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent
          side='right'
          className='text-violet11 select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
          sideOffset={5}
        >
          Mode Toggle
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
