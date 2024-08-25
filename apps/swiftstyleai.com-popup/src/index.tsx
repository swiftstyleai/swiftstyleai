import Debug from 'debug';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { DEBUG } from './constants';
import '@/globals.css';

Debug.enable(DEBUG);

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(
    <AuthProvider>
      <Popup />
    </AuthProvider>,
  );
}

init();
