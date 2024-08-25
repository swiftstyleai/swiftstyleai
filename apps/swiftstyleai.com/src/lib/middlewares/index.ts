import Debug from 'debug';
import concat from 'lodash/concat';
import isArray from 'lodash/isArray';

import type { Action, Reducer } from './types';

const debug = Debug('lib:middlewares');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IndexProps<I, A extends Action<any>> = {
  // Define specific action type
  state: I;
  action: A;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
  // handler: Reducer<I, A>; // Define handler type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  before?: Reducer<I, any>[]; // Optional before middlewares
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  after?: Reducer<I, any>[]; // Optional after middlewares
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMiddlewares<I, A extends Action<any>>({
  state,
  action,
  handler,
  before,
  after,
}: IndexProps<I, A>) {
  debug('apply middlewares');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chain: Reducer<I, any>[] = []; // Use specific reducer type

  // before middlewares
  if (before) {
    chain = [...before, ...chain];
  }

  if (handler) {
    if (isArray(handler)) {
      chain = concat(chain, handler);
    } else {
      chain.push(handler);
    }
  }

  // after middlewares
  if (after) {
    chain = [...chain, ...after];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return chain.reduce((st: I, fn: Reducer<I, any>) => fn(st, action), state);
}

export type CreateReducerParams<I> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlers: Record<string, Reducer<I, any>>; // Define handler type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  before?: Reducer<I, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  after?: Reducer<I, any>[];
};

export function createReducer<I>({
  handlers,
  before,
  after,
}: CreateReducerParams<I>) {
  debug('create reducer');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (state: I, action: Action<any>) => {
    debug('run reducer');

    if (
      !action.type ||
      !Object.prototype.hasOwnProperty.call(handlers, action.type)
    ) {
      return state;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return applyMiddlewares<I, any>({
      // return applyMiddlewares<I, (typeof handlers)[action.type]>({
      // Infer handler type
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: action as Action<any>,
      handler: handlers[action.type],
      before,
      after,
    });
  };
}
