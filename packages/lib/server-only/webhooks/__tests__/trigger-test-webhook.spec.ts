import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebhookTriggerEvents } from '@prisma/client';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { jobs } from '@documenso/jobs/server';
import { generateSampleWebhookPayload } from '../trigger/generate-sample-data';

vi.mock('../get-webhook-by-id');
vi.mock('@documenso/jobs/server');
vi.mock('../trigger/generate-sample-data');

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger test webhook for the specific webhook only', async () => {
    const mockWebhook = {
      id: 'webhook-123',
      enabled: true,
      eventTriggers: [WebhookTriggerEvents.DOCUMENT_COMPLETED],
      webhookUrl: 'https://example.com/webhook',
    };

    vi.mocked(getWebhookById).mockResolvedValue(mockWebhook as any);
    vi.mocked(generateSampleWebhookPayload).mockReturnValue({
      payload: { test: true },
    } as any);
    vi.mocked(jobs.triggerJob).mockResolvedValue({} as any);

    const result = await triggerTestWebhook({
      id: 'webhook-123',
      event: WebhookTriggerEvents.DOCUMENT_COMPLETED,
      userId: 1,
      teamId: 1,
    });

    expect(getWebhookById).toHaveBeenCalledWith({ id: 'webhook-123', userId: 1, teamId: 1 });
    expect(jobs.triggerJob).toHaveBeenCalledWith({
      name: 'internal.execute-webhook',
      payload: {
        event: WebhookTriggerEvents.DOCUMENT_COMPLETED,
        webhookId: 'webhook-123',
        data: { test: true },
      },
    });
    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
  });
});
