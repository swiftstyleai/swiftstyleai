import { render } from '@testing-library/react';
import * as React from 'react';

import { mergeRefs } from './index';

describe('lib/merge-refs', () => {
  const Dummy = React.forwardRef(function Dummy(_, ref) {
    React.useImperativeHandle(ref, () => 'refValue');
    return null;
  });

  test('mergeRefs', () => {
    const refAsFunc = jest.fn();
    const refAsObj = { current: undefined };

    const Example: React.FC<{ visible: boolean }> = ({ visible }) => {
      if (!visible) return null;
      return <Dummy ref={mergeRefs([refAsObj, refAsFunc])} />;
    };

    const { rerender } = render(<Example visible />);

    expect(refAsFunc).toHaveBeenCalledTimes(1);
    expect(refAsFunc).toHaveBeenCalledWith('refValue');
    expect(refAsObj.current).toBe('refValue');

    rerender(<Example visible={false} />);

    expect(refAsFunc).toHaveBeenCalledTimes(2);
    expect(refAsFunc).toHaveBeenCalledWith(null);
    expect(refAsObj.current).toBe(null);
  });

  test('mergeRefs with undefined and null refs', () => {
    const refAsFunc = jest.fn();
    const refAsObj = { current: undefined };

    const Example: React.FC<{ visible: boolean }> = ({ visible }) => {
      return visible ? (
        <Dummy ref={mergeRefs([null, undefined, refAsFunc, refAsObj])} />
      ) : null;
    };

    const { rerender } = render(<Example visible />);

    expect(refAsFunc).toHaveBeenCalledTimes(1);
    expect(refAsFunc).toHaveBeenCalledWith('refValue');
    expect(refAsObj.current).toBe('refValue');

    rerender(<Example visible={false} />);

    expect(refAsFunc).toHaveBeenCalledTimes(2);
    expect(refAsFunc).toHaveBeenCalledWith(null);
    expect(refAsObj.current).toBe(null);
  });
});
