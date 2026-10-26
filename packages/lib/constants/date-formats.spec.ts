import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date formats and ISO 8601 offset handling', () => {
  it('should convert XXX to ZZ for Luxon formatting', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDate = '2026-03-05T10:20:30.123+05:30';
    const converted = convertToLocalSystemFormat(sampleDate, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should gracefully parse legacy dates stamped with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStampedDate = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyStampedDate, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });
});
