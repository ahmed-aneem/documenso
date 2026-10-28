import { describe, it, expect, vi, beforeEach } from 'vitest';
import { triggerTestWebhook } from '../trigger-test-webhook';
import { getWebhookById } from '../get-webhook-by-id';
import { jobs } from '@documenso/jobs/server';

virtuallyMockModule();

vi.mock('../get-webhook-by-id', () => ({
  getWebhookById: vi.fn(),
}));

vi.mock('@documenso/jobs/server', () => ({
  jobs: {
    triggerJob: vi.fn(),
  },
}));

vi.mock('../trigger/generate-sample-data', () => ({
  generateSampleWebhookPayload: vi.fn(() => ({ payload: { test: true } })),
}));

describe('triggerTestWebhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger the job for the specific webhook id only', async () => {
    vi.mocked(getWebhookById).mockResolvedValueOnce({
      id: 'webhook-123',
      enabled: true,
      eventTriggers: ['DOCUMENT_COMPLETED'],
      webhookUrl: 'https://example.com/webhook',
    } as any);

    const result = await triggerTestWebhook({
      id: 'webhook-123',
      event: 'DOCUMENT_COMPLETED',
      userId: 1,
      teamId: 10,
    });

    expect(result).toEqual({ success: true, message: 'Test webhook triggered successfully' });
    expect(jobs.triggerJob).toHaveBeenCalledTimes(1);
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
