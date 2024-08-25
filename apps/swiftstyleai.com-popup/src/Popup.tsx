import {
  // useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@llm-101/shared';
// import { exampleThemeStorage } from '@llm-101/storage';

// import { ComponentPropsWithoutRef } from 'react';
// import { useUser } from './contexts/auth/AuthProvider';
// import { APP_URL } from './constants';
// import { Button } from './components/ui/button';

import { MemoryRouter as Router } from 'react-router-dom';

// import Layout from '~/lib/layout';
import Routings from '@/pages/Routings';

const Popup = () => {
  // const theme = useStorageSuspense(exampleThemeStorage);

  // const { user } = useUser();

  // async function onClickLogin() {
  //   await chrome.tabs.create({
  //     url: `${APP_URL}/signin?opened=extension`,
  //   });
  // }

  return (
    <Router initialEntries={['/']}>
      {/* <Layout> */}
      <Routings />
      {/* </Layout> */}
    </Router>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
