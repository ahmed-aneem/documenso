import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from './trigger-test-webhook';
import { getWebhookById } from './get-webhook-by-id';
import { jobs } from '@documenso/jobs/server';

vi.mock('./get-webhook-by-id');
vi.mock('./trigger/generate-sample-data', () => ({
  generateSampleWebhookPayload: () => ({ payload: { test: true } }),
}));
vi.mock('@documenso/jobs/server', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger test webhook for the specific webhook only', async () => {
    vi.mocked(getWebhookById).mockResolvedValue({
      id: 'webhook-123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook-123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 1,
    });

    expect(result.success).toBe(true);
    expect(jobs.triggerJob).toHaveBeenCalledWith({
      name: 'internal.execute-webhook',
      payload: {
        event: 'DOCUMENT_COMPLETED',
        webhookId: 'webhook-123',
        data: { test: true },
      },
    });
  });
});
