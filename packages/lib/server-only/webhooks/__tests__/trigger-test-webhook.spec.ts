import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebhookTriggerEvents } from '@prisma/client';
import { jobs } from '@documenso/jobs/client';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';

vi.mock('../get-webhook-by-id', () => ({
  getWebhookById: vi.fn(),
}));

vi.mock('@documenso/jobs/client', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger the webhook job for the single specified webhook', async () => {
    const mockWebhook = {
      id: 'webhook_123',
      enabled: true,
      eventTriggers: [WebhookTriggerEvents.DOCUMENT_COMPLETED],
      webhookUrl: 'https://example.com/webhook',
    };

    vi.mocked(getWebhookById).mockResolvedValueOnce(mockWebhook as any);
    vi.mocked(jobs.triggerJob).mockResolvedValueOnce({} as any);

    const result = await triggerTestWebhook({
      id: 'webhook_123',
      event: WebhookTriggerEvents.DOCUMENT_COMPLETED,
      userId: 1,
      teamId: 10,
    });

    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
    expect(jobs.triggerJob).toHaveBeenCalledTimes(1);
    expect(jobs.triggerJob).toHaveBeenCalledWith({
      name: 'internal.execute-webhook',
      payload: {
        event: WebhookTriggerEvents.DOCUMENT_COMPLETED,
        webhookId: 'webhook_123',
        data: expect.any(Object),
      },
    });
  });
});
