// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/77b183c95be2dc99f7399c54c4860f312a456ca8/types/redux-actions/index.d.ts#L4

// FSA-compliant action.
// See: https://github.com/acdlite/flux-standard-action
export interface BaseAction {
  type?: string;
}

export interface Action<Payload> extends BaseAction {
  payload?: Payload;
  error?: boolean | undefined;
}

export interface ActionMeta<Payload, Meta> extends Action<Payload> {
  meta: Meta;
}

export type Reducer<State, Payload> = (
  // state: State | undefined,
  state: State,
  action?: Action<Payload>
) => State;
