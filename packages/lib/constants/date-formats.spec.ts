import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format and offset handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and convert ISO 8601 date with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateText = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDateText, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should support fallback parsing for legacy strings containing literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyText, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
