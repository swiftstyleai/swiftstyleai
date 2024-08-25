import * as React from 'react';

import { logPageView } from './logs';

export default function useTracking(): void {
  React.useEffect(() => {
    logPageView();
  }, []);
}
