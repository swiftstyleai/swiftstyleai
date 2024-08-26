export type RequestType<T = any> = {
  type: string;
  data?: { from: string } & T;
};

export type ResultType = any;
