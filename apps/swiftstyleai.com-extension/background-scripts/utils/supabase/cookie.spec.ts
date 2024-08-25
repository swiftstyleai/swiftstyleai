import { describe, test, expect, afterEach, vi } from 'vitest';
import { parse as cookieParse } from 'cookie';
import { getCookies, getAuthTokenKey } from '@llm-101/cookies';
import { SUPABASE_URL } from '../../constants';
import { getAuthToken } from './cookie';

vi.mock('@llm-101/cookies', () => ({
  getCookies: vi.fn(),
  getAuthTokenKey: vi.fn(),
}));

vi.mock('cookie', () => ({
  parse: vi.fn(),
}));

describe('background-scripts/utils/supabase/cookie', () => {
  describe('getAuthToken', () => {
    const url = 'https://example.com';

    afterEach(() => {
      vi.clearAllMocks();
    });

    test('should return null if no cookie is found', async () => {
      (getAuthTokenKey as vi.Mock).mockReturnValue('auth_token_key');
      (getCookies as vi.Mock).mockResolvedValue(null);

      const result = await getAuthToken({ supabaseUrl: SUPABASE_URL, url });

      expect(getAuthTokenKey).toHaveBeenCalledWith(SUPABASE_URL);
      expect(getCookies).toHaveBeenCalledWith({ url, name: 'auth_token_key' });
      expect(result).toBeNull();
    });

    test('should return parsed session data if cookie is found', async () => {
      const mockCookieValue = '{"user_id":"123"}';
      const mockParsedCookie = { 'auth_token_key': mockCookieValue };
      const mockSessionData = { user_id: '123' };
      const mockCookie = { value: mockCookieValue };

      (getAuthTokenKey as vi.Mock).mockReturnValue('auth_token_key');
      (getCookies as vi.Mock).mockResolvedValue(mockCookie);
      (cookieParse as vi.Mock).mockReturnValue(mockParsedCookie);

      const result = await getAuthToken({ supabaseUrl: SUPABASE_URL, url });

      expect(getAuthTokenKey).toHaveBeenCalledWith(SUPABASE_URL);
      expect(getCookies).toHaveBeenCalledWith({ url, name: 'auth_token_key' });
      expect(cookieParse).toHaveBeenCalledWith(`auth_token_key=${mockCookieValue}`);
      expect(result).toEqual({
        ...mockCookie,
        value: mockSessionData,
      });
    });

    test('should handle invalid JSON in cookie value gracefully', async () => {
      const mockCookieValue = 'invalid_json';
      const mockParsedCookie = { 'auth_token_key': mockCookieValue };
      const mockCookie = { value: mockCookieValue };

      (getAuthTokenKey as vi.Mock).mockReturnValue('auth_token_key');
      (getCookies as vi.Mock).mockResolvedValue(mockCookie);
      (cookieParse as vi.Mock).mockReturnValue(mockParsedCookie);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await getAuthToken({ supabaseUrl: SUPABASE_URL, url });

      expect(getAuthTokenKey).toHaveBeenCalledWith(SUPABASE_URL);
      expect(getCookies).toHaveBeenCalledWith({ url, name: 'auth_token_key' });
      expect(cookieParse).toHaveBeenCalledWith(`auth_token_key=${mockCookieValue}`);
      expect(result).toEqual({
        ...mockCookie,
        value: null,
      });
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse session data', expect.any(SyntaxError));

      consoleSpy.mockRestore();
    });
  });
});
