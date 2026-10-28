import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { generateSampleWebhookPayload } from '../trigger/generate-sample-data';
import { jobs } from '@documenso/jobs/client';

vishMock('@documenso/jobs/client', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

vishMock('../get-webhook-by-id', () => ({
  getWebhookById: vi.fn(),
}));

vishMock('../trigger/generate-sample-data', () => ({
  generateSampleWebhookPayload: vi.fn(),
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger the specific webhook and not all team webhooks', async () => {
    vi.mocked(getWebhookById).mockResolvedValue({
      id: 'webhook-123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    vi.mocked(generateSampleWebhookPayload).mockReturnValue({
      payload: { test: true },
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
