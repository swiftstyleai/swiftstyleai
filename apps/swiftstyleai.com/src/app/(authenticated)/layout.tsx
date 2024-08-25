import { redirect } from 'next/navigation';
import * as React from 'react';

import { createClient } from '@/lib/supabase/server';

import NavigationPanelDrawer from '@/components/layouts/NavigationPanel/Drawer';
import NavigationPanelMain from '@/components/layouts/NavigationPanel/Main';

import Navbar from './components/Navbar';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return redirect('/signin');
  }

  return (
    <>
      <NavigationPanelDrawer>
        <Navbar />
      </NavigationPanelDrawer>
      <NavigationPanelMain>{children}</NavigationPanelMain>
    </>
  );
}
