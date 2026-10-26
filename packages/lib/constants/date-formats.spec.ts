import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date Formats & ISO 8601 support', () => {
  it('should convert date-fns XXX token to Luxon ZZ token', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly parse and format ISO 8601 dates with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    
    const converted = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback and parse legacy literal XXX strings', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStr = '2026-03-05T10:20:30.123XXX';

    const converted = convertToLocalSystemFormat(legacyStr, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
