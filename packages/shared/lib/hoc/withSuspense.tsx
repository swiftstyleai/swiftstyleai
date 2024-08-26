import { ComponentType, ReactElement, Suspense } from 'react';

// https://react.dev/reference/react/Suspense
// <Suspense> lets you display a fallback until its children have finished loading.

export function withSuspense<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  SuspenseComponent: ReactElement,
) {
  return function WithSuspense(props: T) {
    return (
      <Suspense fallback={SuspenseComponent}>
        <Component {...props} />
      </Suspense>
    );
  };
}
