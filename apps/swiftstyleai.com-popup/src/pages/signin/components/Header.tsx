import { Link } from 'react-router-dom';
import { APP_URL, siteConfig } from '@/constants';
import ColorLogo from '@/components/logo/ColorLogo';

export default function Header() {
  return (
    <header className="z-50 w-full py-7 relative mx-auto" aria-label="Global">
      <Link
        className="flex items-center text-xl font-semibold"
        aria-label={siteConfig.title}
        to={`${APP_URL}`}
        target="_blank"
        rel="noreferrer"
      >
        <ColorLogo
          width={56}
          height={56}
          animation="breath"
          className="inline"
        />
        <p className="pl-4 logo">{siteConfig.title}</p>
      </Link>
    </header>
  );
}
