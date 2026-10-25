import { describe, expect, it } from 'vitest';
import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFieldFormat = convertToLocalSystemFormat } from './date-formats';

describe('Date Formats & ISO 8601 Offset Handling', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 date with timezone offset using Luxon without literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(isoFormat);
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(luxonFormat);
    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123[+-]\d{2}:\d{2}$/);
  });

  it('should successfully parse legacy dates stamped with literal XXX in convertToLocalSystemFormat', () => {
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const result = convertToLocalSystemFormat(legacyText, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
