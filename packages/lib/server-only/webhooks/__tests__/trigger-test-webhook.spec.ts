import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { generateSampleWebhookPayload } from '../trigger/generate-sample-data';
import { jobs } from '@documenso/jobs/server';

vi.mock('../get-webhook-by-id');
vi.mock('../trigger/generate-sample-data');
vi.mock('@documenso/jobs/server', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger the job for the single targeted webhook only', async () => {
    vi.mocked(getWebhookById).mockResolvedValue({
      id: 'webhook_123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    vi.mocked(generateSampleWebhookPayload).mockReturnValue({
      payload: { test: true },
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook_123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 1,
    });

    expect(result).toEqual({
      success: true,
      message: 'Test webhook triggered successfully',
    });

    expect(jobs.triggerJob).toHaveBeenCalledTimes(1);
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
