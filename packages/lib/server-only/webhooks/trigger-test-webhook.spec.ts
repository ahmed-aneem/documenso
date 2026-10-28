import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from './trigger-test-webhook';
import { getWebhookById } from './get-webhook-by-id';
import { generateSampleWebhookPayload } from './trigger/generate-sample-data';
import { jobs } from '../jobs';

vitiMock('./get-webhook-by-id');
vitiMock('./trigger/generate-sample-data');
vitiMock('../jobs');

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger internal.execute-webhook specifically for the requested webhook id', async () => {
    vi.mocked(getWebhookById).mockResolvedValueOnce({
      id: 'webhook-123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    vi.mocked(generateSampleWebhookPayload).mockReturnValueOnce({
      payload: { test: true },
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook-123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 1,
    });

    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
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
