import { describe, it, expect, vi } from 'vitest';
import { sendChromeMessageIPC, SendChromeMessageIPCParams } from './index';

// Import the mock
import { chrome } from '../__mocks__/chrome';

// Replace the global chrome object with the mock
global.chrome = chrome;

describe('sendChromeMessageIPC', () => {
  it('should resolve with the response when there is no error', async () => {
    // Mock chrome.runtime.sendMessage
    vi.spyOn(chrome.runtime, 'sendMessage').mockImplementation(
      (id, data, callback) => {
        callback({ res: 'success', err: null });
      },
    );

    const params: SendChromeMessageIPCParams<{ message: string }> = {
      type: 'testType',
      data: { from: 'a.com', message: 'test' },
    };

    const result = await sendChromeMessageIPC(params);

    expect(result).toBe('success');
  });

  it('should reject with an error when there is an error', async () => {
    // Mock chrome.runtime.sendMessage
    vi.spyOn(chrome.runtime, 'sendMessage').mockImplementation(
      (id, data, callback) => {
        callback({ res: null, err: 'Something went wrong' });
      },
    );

    const params: SendChromeMessageIPCParams<{ message: string }> = {
      type: 'testType',
      data: { from: 'a.com', message: 'test' },
    };

    await expect(sendChromeMessageIPC(params)).rejects.toThrow(
      'Something went wrong',
    );
  });
});
