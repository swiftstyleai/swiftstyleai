import { describe, it, expect } from 'vitest';
import { AbstractHandler, RequestType, ResultType } from './chain';

// Mock handler to test the AbstractHandler
class MockHandler extends AbstractHandler {
  private canHandle: boolean;
  private result: ResultType;

  constructor(canHandle: boolean, result: ResultType) {
    super();
    this.canHandle = canHandle;
    this.result = result;
  }

  public async handle(request: RequestType): Promise<ResultType | null> {
    if (this.canHandle) {
      return this.result;
    } else {
      return super.handle(request);
    }
  }
}

// Define the test suite for AbstractHandler
describe('AbstractHandler', () => {
  it('should pass the request to the next handler in the chain', async () => {
    const result = { result: 'Handled by MockHandler' };

    const handler1 = new MockHandler(false, null);
    const handler2 = new MockHandler(true, result);

    handler1.setNext(handler2);

    const request: RequestType = { type: 'test' };
    const response = await handler1.handle(request);

    expect(response).toBe(result);
  });

  it('should return null if no handler in the chain can handle the request', async () => {
    const handler1 = new MockHandler(false, null);
    const handler2 = new MockHandler(false, null);

    handler1.setNext(handler2);

    const request: RequestType = { type: 'test' };
    const response = await handler1.handle(request);

    expect(response).toBeNull();
  });

  it('should handle the request if it can handle it', async () => {
    const result = { result: 'Handled by MockHandler' };

    const handler1 = new MockHandler(true, result);

    const request: RequestType = { type: 'test' };
    const response = await handler1.handle(request);

    expect(response).toBe(result);
  });

  it('should be able to chain multiple handlers', async () => {
    const result1 = { result: 'Handled by MockHandler1' };
    const result2 = { result: 'Handled by MockHandler2' };

    const handler1 = new MockHandler(false, result1);
    const handler2 = new MockHandler(true, result2);
    const handler3 = new MockHandler(false, result1);

    handler1.setNext(handler2).setNext(handler3);

    const request: RequestType = { type: 'test' };
    const response = await handler1.handle(request);

    expect(response).toBe(result2);
  });
});
