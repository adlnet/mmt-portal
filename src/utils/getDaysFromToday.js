'use strict'
import { twentyFourHours } from '@/config/timeConstants'

export const getDaysFromToday = date => {
  const today = new Date();
  const dateToCompare = new Date(date);

  const timeDifference = Math.abs(dateToCompare - today);
  const daysDifference = Math.floor(timeDifference /  twentyFourHours);
  return daysDifference;
};

// This is used for the overview page, if days is 0 display "today", if it's 1 day ago, display "day", if 1 or more days ago, display "days"
export const getFormatDaysFromToday = dateStr => {
  if (!dateStr) return 'N/A';
  
  const days = getDaysFromToday(dateStr);
  
  if (days === 0) {
    return 'Sent today';
  } else if (days === 1) {
    return 'Sent 1 day ago';
  } else {
    return `Sent ${days} days ago`;
  }
};