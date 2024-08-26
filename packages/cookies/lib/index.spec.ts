import { describe, it, expect, vi } from 'vitest';
import {
  getCookies,
  GetAccessTokenParams,
  SetCookieParams,
  setCookies,
} from './index';

// Mock chrome.cookies.get and chrome.runtime.lastError
globalThis.chrome = {
  cookies: {
    get: vi.fn(),
    set: vi.fn(),
  },
  runtime: {
    lastError: null as any, // Initialize lastError as null
  },
};

describe('getCookies', () => {
  it('should resolve with cookie value when cookie is found', async () => {
    const params: GetAccessTokenParams = {
      url: 'https://example.com',
      name: 'testCookie',
    };
    const cookieValue = 'cookie_value';

    (chrome.cookies.get as jest.Mock).mockImplementation(
      (details, callback) => {
        callback({ value: cookieValue });
      },
    );

    const result = await getCookies(params);
    expect(result).toEqual({ value: cookieValue });
  });

  it('should resolve with null when cookie is not found', async () => {
    const params: GetAccessTokenParams = {
      url: 'https://example.com',
      name: 'testCookie',
    };

    (chrome.cookies.get as jest.Mock).mockImplementation(
      (details, callback) => {
        callback(null);
      },
    );

    const result = await getCookies(params);
    expect(result).toBeNull();
  });

  it('should reject with an error when there is a runtime error', async () => {
    const params: GetAccessTokenParams = {
      url: 'https://example.com',
      name: 'testCookie',
    };
    const errorMessage = 'An error occurred';

    // Simulate a runtime error
    chrome.runtime.lastError = { message: errorMessage };

    (chrome.cookies.get as jest.Mock).mockImplementation(
      (details, callback) => {
        callback(null);
      },
    );

    await expect(getCookies(params)).rejects.toThrow(errorMessage);

    // Reset lastError for other tests
    chrome.runtime.lastError = null;
  });
});

describe('setCookies', () => {
  it('should resolve when the cookie is set successfully', async () => {
    const params: SetCookieParams = {
      url: 'https://example.com',
      name: 'testCookie',
      value: 'cookie_value',
    };

    (chrome.cookies.set as jest.Mock).mockImplementation(
      (details, callback) => {
        callback({} as chrome.cookies.Cookie);
      },
    );

    await expect(setCookies(params)).resolves.toBeUndefined();
  });

  it('should reject with an error when there is a runtime error', async () => {
    const params: SetCookieParams = {
      url: 'https://example.com',
      name: 'testCookie',
      value: 'cookie_value',
    };
    const errorMessage = 'An error occurred';

    // Simulate a runtime error
    chrome.runtime.lastError = { message: errorMessage };

    (chrome.cookies.set as jest.Mock).mockImplementation(
      (details, callback) => {
        callback(null);
      },
    );

    await expect(setCookies(params)).rejects.toThrow(errorMessage);

    // Reset lastError for other tests
    chrome.runtime.lastError = null;
  });
});
