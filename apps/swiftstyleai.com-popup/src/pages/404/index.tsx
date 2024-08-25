import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate('/');

  return (
    <>
      <Button onClick={handleBackToHome}>Let&apos;s Head Back</Button>
    </>
  );
};

export default Page404;
