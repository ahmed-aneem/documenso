import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date formats and ISO 8601 timezone offset handling', () => {
  it('should map ISO 8601 format XXX to ZZ for Luxon', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 without leaving literal XXX', () => {
    const customText = '2026-03-05T10:20:30.123+05:30';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const formatted = convertToLocalSystemFormat(customText, isoFormat, 'UTC');
    expect(formatted).not.toContain('XXX');
    expect(formatted).toContain('+');
  });

  it('should fall back and successfully parse legacy date strings with literal XXX', () => {
    const legacyCustomText = '2026-03-05T10:20:30.123XXX';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const formatted = convertToLocalSystemFormat(legacyCustomText, isoFormat, 'UTC');
    expect(formatted).not.toBe('Invalid date');
  });
});
