import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date formats ISO 8601 timezone fix', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES.find((f) => f.includes('XXX')) as string;
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should successfully convert local system format for ISO 8601 with timezone offset', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES.find((f) => f.includes('XXX')) as string;
    const dateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(dateStr, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back and parse legacy date strings with literal XXX', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES.find((f) => f.includes('XXX')) as string;
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
