import { formatDateISOWithTimezone } from './format-date';

describe('formatDateISOWithTimezone', () => {
  it('should correctly format date with timezone offset without literal XXX error', () => {
    const date = new Date('2023-10-01T12:00:00Z');
    const formatted = formatDateISOWithTimezone(date, 'UTC');
    expect(formatted).toContain('Z');
    expect(formatted).not.toContain('XXX');
  });
});
