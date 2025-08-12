'use strict';

import { getDaysFromToday, getFormatDaysFromToday } from "@/utils/getDaysFromToday";

describe('getDaysFromToday', () => {
  beforeEach(() => {
    jest.useFakeTimers({
      now: new Date(2025, 1, 3)
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockDate = new Date(2025, 1, 1);
  const mockToday = new Date(2025, 1, 3);
  const mockYesterday = new Date(2025, 1, 2);

  it('should get the correct days difference', () => {
    expect(getDaysFromToday(mockDate)).toBe(2);
    expect(getDaysFromToday(mockToday)).toBe(0);
    expect(getDaysFromToday(mockYesterday)).toBe(1);
  });

  it('should return N/A for invalid date', () => {
    expect(getFormatDaysFromToday('')).toBe('N/A');
    expect(getFormatDaysFromToday(null)).toBe('N/A');
    expect(getFormatDaysFromToday(undefined)).toBe('N/A');
  });

  it('should return the correct format for days difference', () => {
    expect(getFormatDaysFromToday(mockDate)).toBe('Sent 2 days ago');
    expect(getFormatDaysFromToday(mockToday)).toBe('Sent today');
    expect(getFormatDaysFromToday(mockYesterday)).toBe('Sent 1 day ago');
  });
});
