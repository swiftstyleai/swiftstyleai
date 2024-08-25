import Debug from 'debug';
import * as React from 'react';

const debug = Debug('lib:hooks:useDidUpdateEffect');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDidUpdateEffect(fn: () => void, inputs: any) {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      debug('run use did update effect');
      fn();
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}
