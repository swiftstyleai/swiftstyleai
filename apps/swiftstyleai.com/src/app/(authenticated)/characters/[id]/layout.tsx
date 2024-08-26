import React, { ReactNode } from 'react';

import { CharactersIDProvider } from '@/components/CharactersIDPage/contexts';
import { DeletingCharacterDialogProvider } from '@/components/DeletingCharacterDialog/contexts';

export interface CharactersIDLayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

// Next.js discussion: explains potential issues with layouts in nested routing
// https://github.com/vercel/next.js/discussions/51818
export default function CharactersIDLayout({
  children,
  params: { id },
}: CharactersIDLayoutProps): JSX.Element {
  return (
    <DeletingCharacterDialogProvider>
      <CharactersIDProvider characterId={id}>{children}</CharactersIDProvider>
    </DeletingCharacterDialogProvider>
  );
}
