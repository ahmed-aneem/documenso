import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { jobs } from '@documenso/jobs/client';

virtuallyMockGetWebhookByIdAndJobs();

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

  it('should trigger test webhook for the single specified webhook only', async () => {
    const mockWebhook = {
      id: 'webhook_123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://webhook.site/test',
    };

    vi.mocked(getWebhookById).mockResolvedValueOnce(mockWebhook as any);
    vi.mocked(jobs.triggerJob).mockResolvedValueOnce({} as any);

    const result = await triggerTestWebhook({
      id: 'webhook_123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 1,
    });

    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
    expect(getWebhookById).toHaveBeenCalledWith({ id: 'webhook_123', userId: 1, teamId: 1 });
    expect(jobs.triggerJob).toHaveBeenCalledTimes(1);
    expect(jobs.triggerJob).toHaveBeenCalledWith({
      name: 'internal.execute-webhook',
      payload: {
        event: 'DOCUMENT_COMPLETED',
        webhookId: 'webhook_123',
        data: expect.any(Object),
      },
    });
  });
});
