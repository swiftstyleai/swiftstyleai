import { describe, it, expect } from 'vitest';
import { isInAllowlist } from './index';

describe('lib/isInAllowlist', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location
    delete (window as any).location;
    (window as any).location = { href: '' };
  });

  afterEach(() => {
    // Restore window.location after each test
    (window as any).location = originalLocation;
  });

  it('should return true if the current URL is in the allowlist', () => {
    window.location.href = 'http://example.com/page';
    const allowlist = ['http://example.com'];
    const result = isInAllowlist(allowlist);
    expect(result).toBe(true);
  });

  it('should return false if the current URL is not in the allowlist', () => {
    window.location.href = 'http://example.com/page';
    const allowlist = ['http://notexample.com'];
    const result = isInAllowlist(allowlist);
    expect(result).toBe(false);
  });

  it('should return true if the current URL starts with any URL in the allowlist', () => {
    window.location.href = 'http://example.com/page/subpage';
    const allowlist = ['http://example.com/page'];
    const result = isInAllowlist(allowlist);
    expect(result).toBe(true);
  });

  it('should handle an empty allowlist and return false', () => {
    window.location.href = 'http://example.com/page';
    const allowlist: string[] = [];
    const result = isInAllowlist(allowlist);
    expect(result).toBe(false);
  });

  it('should return false if current URL is empty', () => {
    window.location.href = '';
    const allowlist = ['http://example.com'];
    const result = isInAllowlist(allowlist);
    expect(result).toBe(false);
  });
});
