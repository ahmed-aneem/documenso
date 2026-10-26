import { formatInTimeZone } from 'date-fns-tz';

export const formatDateISOWithTimezone = (date: Date | string, timezone: string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return formatInTimeZone(parsedDate, timezone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};
