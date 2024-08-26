// https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example#example-0
import { type ResultType, type RequestType } from './types';

/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
export interface Handler<Request = RequestType, Result = ResultType> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
  handle(request: Request): Promise<Result | null>;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  /**
   * Sets the next handler in the chain.
   * @param handler - The next handler.
   * @returns The next handler, allowing for method chaining.
   */
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * Handles the request or passes it to the next handler in the chain.
   * @param request - The request to handle.
   * @returns A promise with the result or null if no handler can process the request.
   */
  public async handle(request: RequestType): Promise<ResultType | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(request);
    }

    return null;
  }
}
