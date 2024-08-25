'use client';

import { BookOpenText, CircleUser } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Link } from '@/lib/react-transition-progress/next';
import { createClient } from '@/lib/supabase/client';

import { AvatarAnimation } from '@/components/Avatar';
import DarkcolorLogo from '@/components/logo/DarkcolorLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { withPrivateRoute } from '@/contexts/auth/withPrivateRoute';

import GuildSeparator from './GuildSeparator';
import ListItem from './ListItem';
import ListItemAvatar from './ListItemAvatar';
import ListItemPill from './ListItemPill';
import { ModeToggle } from './ModeToggle';

export interface NavbarProps {
  logo?: React.ReactNode;
}

const workspaces = [
  {
    id: 'characters',
    name: 'Characters',
    description: 'Manage your characters',
  },
];

const Navbar: React.FC<NavbarProps> = ({
  logo = <DarkcolorLogo width={32} height={32} />,
}) => {
  const pathname = usePathname();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optional: Add a refresh or redirect if needed after sign out.
  };

  return (
    <>
      <nav className='select-none pt-3 pb-0 px-0 relative box-border min-h-0 flex-auto overflow-scroll overflow-hidden pr-0'>
        <Link href='/dashboard' className='relative'>
          <ListItem active={pathname === '/dashboard'}>
            <ListItemPill hover active={pathname === '/dashboard'} />
            <ListItemAvatar>
              <AvatarAnimation
                active={pathname === '/dashboard'}
                hover
                className='inline-flex select-none align-middle h-[48px] w-[48px] items-center justify-center rounded-lg'
              >
                {logo}
              </AvatarAnimation>
            </ListItemAvatar>
          </ListItem>
        </Link>
        <ListItem>
          <GuildSeparator />
        </ListItem>
        <div aria-label='Servers'>
          {workspaces.map((workspace) => (
            <Tooltip key={workspace.id}>
              <Link href={`/${workspace.id}`}>
                <TooltipTrigger asChild>
                  <ListItem active={pathname.includes(workspace.id)}>
                    {({ active, hover }) => (
                      <>
                        <ListItemPill active={active} hover={hover} />
                        <ListItemAvatar>
                          <AvatarAnimation
                            active={active}
                            hover={hover}
                            className='inline-flex select-none align-middle h-[48px] w-[48px] items-center justify-center rounded-lg'
                          >
                            <BookOpenText className='h-5 w-5' />
                            <span className='sr-only'>{workspace.name}</span>
                          </AvatarAnimation>
                        </ListItemAvatar>
                      </>
                    )}
                  </ListItem>
                </TooltipTrigger>
              </Link>
              <TooltipContent
                side='right'
                className='text-violet11 select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
                sideOffset={5}
              >
                {workspace.description}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 sm:py-5'>
        <DropdownMenu>
          <Tooltip delayDuration={100}>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <ListItem>
                  {({ active, hover }) => (
                    <>
                      <ListItemPill active={active} hover={hover} />
                      <ListItemAvatar>
                        <AvatarAnimation
                          active={active}
                          hover={hover}
                          className='inline-flex select-none align-middle h-[48px] w-[48px] items-center justify-center rounded-lg'
                        >
                          <CircleUser className='h-5 w-5' />
                          <span className='sr-only'>Account</span>
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
              Account
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent side='right' align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </nav>
    </>
  );
};

export default withPrivateRoute(Navbar);
