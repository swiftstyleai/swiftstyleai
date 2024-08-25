import { Link } from '@/lib/react-transition-progress/next';

import { Typography } from '@/components/ui/typography';

export interface RouteProps {
  href: string;
  label: string;
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface FooterColumnProps {
  title: string;
  links: RouteProps[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <Typography className='font-semibold' asChild>
        <h4>{title}</h4>
      </Typography>
      <div className='mt-3 grid space-y-3 text-sm'>
        {links.map(({ href, label, disabled, target }, index) => (
          <Link
            key={`${href}-${index}`}
            href={href}
            aria-label={label}
            target={target}
            className={`text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 dark:hover:text-neutral-300 dark:focus:text-neutral-300 ${
              disabled ? 'pointer-events-none' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
