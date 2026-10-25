import { describe, expect, it } from 'vitest';
import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('date-formats utils', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and convert ISO 8601 strings with timezone offset properly', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const isoString = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(isoString, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back to legacy literal XXX when parsing older documents', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyString, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
