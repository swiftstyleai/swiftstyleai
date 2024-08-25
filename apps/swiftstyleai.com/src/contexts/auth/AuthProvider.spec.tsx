import { Session, User } from '@supabase/supabase-js';
import { render, waitFor } from '@testing-library/react';
import React, { act } from 'react';

import { setCookies } from '@/lib/cookies/client';
import { createClient } from '@/lib/supabase/client';

import { AuthProvider, useUser } from './AuthProvider';

// Mocking the Supabase client
jest.mock('@/lib/supabase/client');
jest.mock('@/lib/cookies/client');

const mockCreateClient = createClient as jest.MockedFunction<
  typeof createClient
>;
const mockSetCookies = setCookies as jest.MockedFunction<typeof setCookies>;

const mockSession: Session = {
  access_token: 'access_token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'refresh_token',
  user: {
    id: 'user_id',
    email: 'user@example.com',
    // other user properties
  } as User,
};

const mockSupabaseClient = {
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: mockSession } }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    }),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mockCreateClient.mockReturnValue(mockSupabaseClient as any);

const MockConsumer = () => {
  const { user, session, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div>User: {user?.email}</div>
      <div>Session: {session?.access_token}</div>
    </div>
  );
};

describe('contexts/auth/AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides user and session context to children', async () => {
    await act(async () => {
      render(
        <AuthProvider user={null} session={null}>
          <MockConsumer />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(mockSupabaseClient.auth.getSession).toHaveBeenCalled();
      expect(mockSetCookies).toHaveBeenCalledWith(mockSession);
    });
  });

  it('handles auth state change', async () => {
    const newSession = { ...mockSession, access_token: 'new_access_token' };
    mockSupabaseClient.auth.onAuthStateChange.mockImplementationOnce(
      (callback) => {
        callback('SIGNED_IN', newSession);
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      }
    );

    await act(async () => {
      render(
        <AuthProvider user={null} session={null}>
          <MockConsumer />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(mockSupabaseClient.auth.onAuthStateChange).toHaveBeenCalled();
      expect(mockSetCookies).toHaveBeenCalledWith(newSession);
    });
  });
});
