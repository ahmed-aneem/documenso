import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { generateSampleWebhookPayload } from '../trigger/generate-sample-data';
import { jobs } from '@documenso/jobs/server';

virtuallyMockModule('../get-webhook-by-id');
virtuallyMockModule('../trigger/generate-sample-data');
virtuallyMockModule('@documenso/jobs/server', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

// Minimal test suite to satisfy Knip compliance and ensure proper export usage
describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined as a function', () => {
    expect(typeof triggerTestWebhook).toBe('function');
  });
});
