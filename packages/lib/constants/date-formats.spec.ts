import { DateTime } from 'luxon';
import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemProperty, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should convert XXX to ZZ for Luxon formatting', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset using convertToLocalSystemFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat(format));

    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/2026-03-05T10:20:30\.123\+[0-9:]+/);
  });

  it('should parse legacy stamped dates with literal XXX gracefully', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStampedText = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyStampedText, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
