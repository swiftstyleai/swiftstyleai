import { describe, it, expect } from 'vitest';
import { getAuthTokenKey, getAuthTokenVerifierKey } from './supabase';

describe('getAuthTokenKey', () => {
  it('should convert a URL to the correct cookie key', () => {
    const url =
      'http://ec2-47-129-18-54.ap-southeast-1.compute.amazonaws.com:8080';
    const expectedKey = 'sb-ec2-47-129-18-54-auth-token';
    const result = getAuthTokenKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs with different subdomains correctly', () => {
    const url = 'http://another-example.com';
    const expectedKey = 'sb-another-example-auth-token';
    const result = getAuthTokenKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs with different protocols', () => {
    const url = 'https://example.org';
    const expectedKey = 'sb-example-auth-token';
    const result = getAuthTokenKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs without a port', () => {
    const url = 'http://example.net';
    const expectedKey = 'sb-example-auth-token';
    const result = getAuthTokenKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs with multiple subdomains', () => {
    const url = 'http://subdomain.example.co.uk';
    const expectedKey = 'sb-subdomain-auth-token';
    const result = getAuthTokenKey(url);
    expect(result).toBe(expectedKey);
  });
});

describe('getAuthTokenVerifierKey', () => {
  it('should return the correct auth token verifier key', () => {
    const url =
      'http://ec2-47-129-18-54.ap-southeast-1.compute.amazonaws.com:8080';
    const expectedKey = 'sb-ec2-47-129-18-54-auth-token-code-verifier';
    const result = getAuthTokenVerifierKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle different subdomains correctly', () => {
    const url = 'http://another-example.com';
    const expectedKey = 'sb-another-example-auth-token-code-verifier';
    const result = getAuthTokenVerifierKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle different protocols correctly', () => {
    const url = 'https://example.org';
    const expectedKey = 'sb-example-auth-token-code-verifier';
    const result = getAuthTokenVerifierKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs without a port', () => {
    const url = 'http://example.net';
    const expectedKey = 'sb-example-auth-token-code-verifier';
    const result = getAuthTokenVerifierKey(url);
    expect(result).toBe(expectedKey);
  });

  it('should handle URLs with multiple subdomains', () => {
    const url = 'http://subdomain.example.co.uk';
    const expectedKey = 'sb-subdomain-auth-token-code-verifier';
    const result = getAuthTokenVerifierKey(url);
    expect(result).toBe(expectedKey);
  });
});
