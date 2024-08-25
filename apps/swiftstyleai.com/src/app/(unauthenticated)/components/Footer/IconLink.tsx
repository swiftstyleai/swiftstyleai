import { type LucideIcon } from 'lucide-react';

import { Link } from '@/lib/react-transition-progress/next';

import { Button } from '@/components/ui/button';

export interface IconLinkProps {
  href: string;
  icon: LucideIcon;
}

export default function IconLink({ href, icon: Icon }: IconLinkProps) {
  return (
    <Button variant='ghost' size='icon' asChild>
      <Link href={href} target='_blank'>
        <Icon className='h-4 w-4' />
      </Link>
    </Button>
  );
}
