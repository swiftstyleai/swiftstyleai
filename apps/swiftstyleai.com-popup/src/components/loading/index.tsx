// https://stackoverflow.com/questions/73252505/how-to-make-a-loading-screen-on-react-router
import { siteConfig } from '@/constants';
import { useUser } from '@/contexts/auth/AuthProvider';
import { Outlet } from 'react-router-dom';
import ColorLogo from '../logo/ColorLogo';

// In your page wrapper set loaded to true immediately after you render
const LoadingScreen = () => {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col flex-nowrap justify-center items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl logo">
          {siteConfig.title}
        </h1>
        <ColorLogo
          width={128}
          height={128}
          animation="spin"
          className="mt-10"
        />
      </div>
    );
  }

  return <Outlet />;
};

export default LoadingScreen;
