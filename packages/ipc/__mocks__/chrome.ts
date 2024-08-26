// __mocks__/chrome.ts
import { vi } from 'vitest';

const chrome = {
  runtime: {
    id: 'test-id',
    sendMessage: vi.fn(),
  },
};

export { chrome };
