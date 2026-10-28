import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from './trigger-test-webhook';
import { getWebhookById } from './get-webhook-by-id';
import { jobs } from '@documenso/jobs/server';

virtuallyMockModule();

vi.mock('./get-webhook-by-id', () => ({
  getWebhookById: vi.fn(),
}));

vi.mock('@documenso/jobs/server', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

vi.mock('./trigger/generate-sample-data', () => ({
  generateSampleWebhookPayload: vi.fn().mockReturnValue({
    payload: { test: true },
  }),
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger job specifically for the requested webhook id', async () => {
    vi.mocked(getWebhookById).mockResolvedValue({
      id: 'webhook_123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook_123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 10,
    });

    expect(result.success).toBe(true);
    expect(jobs.triggerJob).toHaveBeenCalledWith({
      name: 'internal.execute-webhook',
      payload: {
        event: 'DOCUMENT_COMPLETED',
        webhookId: 'webhook_123',
        data: { test: true },
      },
    });
  });
});
