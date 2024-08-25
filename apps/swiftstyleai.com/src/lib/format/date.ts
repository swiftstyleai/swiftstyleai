import { format, parseISO } from 'date-fns';

export function dateFormat(
  date: Date | string = new Date(),
  formatStr = 'MMM dd, yyyy'
) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
}

import { formatStringToArray } from './string';

// y: years
// M: Months
// w: Weeks
// d: days
// h: hours
// m: Minutes
// s: Seconds
export enum TimeUnits {
  y = 'y',
  M = 'M',
  w = 'w',
  d = 'd',
  h = 'h',
  m = 'm',
  s = 's',
}

const timeUnits = {
  y: 31536000,
  M: 2592000,
  w: 604800,
  d: 86400,
  h: 3600,
  m: 60,
  s: 1,
} as Record<TimeUnits, number>;

const timeLabels = {
  y: 'years',
  M: 'months',
  w: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds',
} as Record<TimeUnits, string>;

export function convertNumberToDuration(seconds: number, format = 'h:m:s') {
  if (seconds < 0 || isNaN(seconds)) {
    throw new Error('Input must be a non-negative number');
  }

  const result: Record<string, number> = {};

  const formatArray = formatStringToArray(format);

  for (let i = 0; i < formatArray.length; i++) {
    const unit = formatArray[i];
    if (!timeUnits[unit as TimeUnits]) {
      throw new Error(`The '${unit}' format is not found.`);
    }
    const timeUnit = timeUnits[unit as TimeUnits];
    const timeValue = Math.floor(seconds / timeUnit);
    const label = timeLabels[unit as TimeUnits];
    result[label] = timeValue;
    seconds -= timeValue * timeUnit;
  }

  return result;
}

export interface NumberDurationInArray {
  label: string;
  value: number;
}

export function convertNumberToDurationInArray(
  seconds: number,
  format = 'h:m:s'
): NumberDurationInArray[] {
  if (seconds < 0 || isNaN(seconds)) {
    throw new Error('Input must be a non-negative number');
  }

  const result: NumberDurationInArray[] = [];

  const formatArray = formatStringToArray(format);

  for (let i = 0; i < formatArray.length; i++) {
    const unit = formatArray[i];
    if (!timeUnits[unit as TimeUnits]) {
      throw new Error(`The '${unit}' format is not found.`);
    }
    const timeUnit = timeUnits[unit as TimeUnits];
    const timeValue = Math.floor(seconds / timeUnit);
    const label = timeLabels[unit as TimeUnits];
    result.push({
      label,
      value: timeValue,
    });
    seconds -= timeValue * timeUnit;
  }

  return result;
}

export function formatIsoDate(isoDateStr: string) {
  const date = parseISO(isoDateStr);
  return format(date, 'yyyy-MM-dd');
}
