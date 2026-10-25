import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should correctly map XXX to ZZ using toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format or convert ISO 8601 strings containing offsets correctly', () => {
    const formatted = convertToLocalSystemFormat(
      '2026-03-05T10:20:30.123+05:30',
      "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
      'UTC'
    );
    expect(formatted).not.toBe('Invalid date');
  });

  it('should handle legacy XXX strings in convertToLocalSystemFormat', () => {
    const formatted = convertToLocalSystemFormat(
      '2026-03-05T10:20:30.123XXX',
      "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
      'UTC'
    );
    expect(formatted).not.toBe('Invalid date');
  });
});
