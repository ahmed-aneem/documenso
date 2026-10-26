import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format Handling', () => {
  it('should correctly map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 date with timezone offset using Luxon', () => {
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should successfully parse and convert local system format for ISO 8601', () => {
    const dateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(dateStr, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should support parsing legacy dates stamped with literal XXX', () => {
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyStr, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should validate VALID_DATE_FORMAT_VALUES contains ISO 8601', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
