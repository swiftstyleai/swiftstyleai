import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

export function ToasterApp() {
  return (
    <ToastProvider>
      <Toaster />
      <ToastViewport />
    </ToastProvider>
  );
}
