import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format Handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    // Test that VALID_DATE_FORMAT_VALUES contains the format
    expect(VALID_DATE_FORMAT_VALUES).toContain(isoFormat);

    const converted = convertToLocalSystemFormat(
      '2026-03-05T10:20:30.123+05:30',
      isoFormat,
      'Asia/Kolkata'
    );
    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback to legacy literal XXX parsing for backward compatibility', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStumped = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(
      legacyStumped,
      isoFormat,
      'UTC'
    );
    expect(converted).not.toBe('Invalid date');
  });
});
