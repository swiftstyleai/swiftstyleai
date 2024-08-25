import { applyMiddlewares, createReducer } from './index';

describe('lib/middlewares', () => {
  describe('applyMiddlewares', () => {
    it('should return an empty array if no middlewares provided', () => {
      const state = {};
      const action = { type: 'TEST' };
      const handler = jest.fn((s) => s);
      const result = applyMiddlewares({ state, action, handler });
      expect(result).toEqual(state);
    });

    it('should call before middlewares in order', () => {
      const mockBefore1 = jest.fn();
      const mockBefore2 = jest.fn();
      const state = {};
      const handler = jest.fn((s) => s);
      const action = { type: 'TEST' };
      applyMiddlewares({
        state,
        action,
        handler,
        before: [mockBefore1, mockBefore2],
      });
      expect(mockBefore1).toHaveBeenCalledBefore(mockBefore2);
    });

    it('should call handler for matching action type', () => {
      const mockHandler = jest.fn();
      const state = {};
      const action = { type: 'TEST' };
      applyMiddlewares({ state, action, handler: mockHandler });
      expect(mockHandler).toHaveBeenCalledWith(state, action);
    });

    it('should combine multiple handlers in an array', () => {
      const mockHandler1 = jest.fn((s) => s);
      const mockHandler2 = jest.fn();
      const state = {};
      const action = { type: 'TEST' };
      applyMiddlewares({
        state,
        action,
        handler: [mockHandler1, mockHandler2],
      });
      expect(mockHandler1).toHaveBeenCalledWith(state, action);
      expect(mockHandler2).toHaveBeenCalledWith(state, action);
    });

    it('should call after middlewares in order', () => {
      const mockAfter1 = jest.fn();
      const mockAfter2 = jest.fn();
      const handler = jest.fn();
      const state = {};
      const action = { type: 'TEST' };
      applyMiddlewares({
        state,
        action,
        handler,
        after: [mockAfter1, mockAfter2],
      });
      expect(mockAfter2).toHaveBeenCalledAfter(mockAfter1);
    });

    it('should pass state and action through the chain', () => {
      const mockHandler = jest.fn((s, a) => ({ state: s, action: a }));
      const state = {};
      const action = { type: 'TEST' };
      const result = applyMiddlewares({ state, action, handler: mockHandler });
      expect(result).toEqual({ state, action });
    });

    it('should return the state if action type is not found', () => {
      const handler = jest.fn((s) => s);
      const state = { test: 'data' };
      const action = { type: 'UNKNOWN' };
      const result = applyMiddlewares({ handler, state, action });
      expect(result).toBe(state);
    });
  });

  describe('createReducer', () => {
    it('should return the state for unmatched action types', () => {
      const initialState = { test: 'data' };
      const reducer = createReducer({ handlers: { TEST: jest.fn() } });
      const action = { type: 'UNKNOWN' };
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });

    // it('should call handler for matching action type', () => {
    //   const mockHandler = jest.fn((state) => ({ ...state, updated: true }));
    //   const initialState = { test: 'data' };
    //   const reducer = createReducer({ handlers: { TEST: mockHandler } });
    //   const action = { type: 'TEST' };
    //   const result = reducer(initialState, action);
    //   expect(result).toEqual({ test: 'data', updated: true });
    //   expect(mockHandler).toHaveBeenCalledWith(initialState, action);
    // });

    // it('should call before middlewares before handler', () => {
    //   const mockBefore = jest.fn((state) => ({ ...state, beforeCalled: true }));
    //   const mockHandler = jest.fn();
    //   const initialState = {};
    //   const reducer = createReducer({
    //     handlers: { TEST: mockHandler },
    //     before: [mockBefore],
    //   });
    //   const action = { type: 'TEST' };
    //   reducer(initialState, action);
    //   expect(mockBefore).toHaveBeenCalledBefore(mockHandler);
    // });
    // it('should call after middlewares after handler', () => {
    //   const mockAfter = jest.fn();
    //   const mockHandler = jest.fn();
    //   const initialState = {};
    //   const reducer = createReducer({
    //     handlers: { TEST: mockHandler },
    //     after: [mockAfter],
    //   });
    //   const action = { type: 'TEST' };
    //   reducer(initialState, action);
    //   expect(mockHandler).toHaveBeenCalledBefore(mockAfter);
    // });
  });
});
