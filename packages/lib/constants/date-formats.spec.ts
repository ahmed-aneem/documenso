import { describe, expect, it } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should convert XXX to ZZ for Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and format ISO 8601 dates correctly with timezone offsets', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const input = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(input, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
    expect(result).toContain('+05:30');
  });

  it('should fallback and parse legacy dates with literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const input = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(input, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
