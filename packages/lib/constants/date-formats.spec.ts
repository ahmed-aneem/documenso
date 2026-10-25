import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, DEFAULT_DOCUMENT_DATE_FORMAT } from './date-formats';

describe('Date Formats & ISO 8601 Offset Fix', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateString = '2026-03-05T10:20:30.123';
    
    // Test convertToLocalSystemFormat with ISO 8601
    const converted = convertToLocalSystemFormat(sampleDateString, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
    expect(converted).toContain('2026-03-05');
  });

  it('should handle legacy strings stamped with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStamped = '2026-03-05T10:20:30.123XXX';
    
    const converted = convertToLocalSystemFormat(legacyStamped, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
