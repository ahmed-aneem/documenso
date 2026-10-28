import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from './trigger-test-webhook';
import { getWebhookById } from './get-webhook-by-id';
import { generateSampleWebhookPayload } from './trigger/generate-sample-data';
import { jobs } from '@documenso/jobs';

vi.mock('./get-webhook-by-id');
vi.mock('./trigger/generate-sample-data');
vi.mock('@documenso/jobs', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger the webhook job specifically for the requested webhook id', async () => {
    const mockWebhook = {
      id: 'webhook_123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    };

    vi.mocked(getWebhookById).mockResolvedValue(mockWebhook as any);
    vi.mocked(generateSampleWebhookPayload).mockReturnValue({
      payload: { test: true },
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook_123',
      event: 'DOCUMENT_COMPLETED' as any,
      userId: 1,
      teamId: 10,
    });

    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
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
