import { renderHook } from '@testing-library/react';

import useDidUpdateEffect from './useDidUpdateEffect'; // Replace with the actual path to your hook

describe('hooks/useDidUpdateEffect', () => {
  it('should call the effect function on update', () => {
    const effectFunction = jest.fn();
    const { rerender } = renderHook(({ fn }) => useDidUpdateEffect(fn, []), {
      initialProps: { fn: effectFunction },
    });

    // The effect should not be called on the initial render
    expect(effectFunction).not.toHaveBeenCalled();

    // Rerender to trigger the effect
    rerender({ fn: effectFunction });

    // The effect should be not called after rerender
    expect(effectFunction).toHaveBeenCalledTimes(0);
  });

  it('should not call the effect function when dependencies do not change', () => {
    const effectFunction = jest.fn();
    const { rerender } = renderHook(
      ({ fn }) => useDidUpdateEffect(fn, [1, 2, 3]),
      {
        initialProps: { fn: effectFunction },
      }
    );

    // The effect should not be called on the initial render
    expect(effectFunction).not.toHaveBeenCalled();

    // Rerender with the same dependencies
    rerender({ fn: effectFunction });

    // The effect should not be called again
    expect(effectFunction).not.toHaveBeenCalled();
  });

  it('should call the effect function when dependencies change', () => {
    const effectFunction = jest.fn();
    const { rerender } = renderHook(
      ({ fn, inputs }) => useDidUpdateEffect(fn, inputs),
      {
        initialProps: { fn: effectFunction, inputs: [1, 2, 3] },
      }
    );

    // The effect should not be called on the initial render
    expect(effectFunction).not.toHaveBeenCalled();

    // Rerender with different dependencies
    rerender({ fn: effectFunction, inputs: [4, 5, 6] });

    // The effect should be called again with the new dependencies
    expect(effectFunction).toHaveBeenCalledTimes(1);
  });
});
