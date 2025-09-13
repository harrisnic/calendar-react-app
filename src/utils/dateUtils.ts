import { DateTime } from 'luxon';

interface timeDuration {
    hours: number;
    minutes: number;
}

export enum DatePartEnum {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
    HOUR = 'hour',
    MINUTE = 'minute'
}

/**
 * Format date in a friendly way for upcoming events
 * If the event is less than a week from now, display “in 3 days” or “in 10 hours”
 * Otherwise show the full date as (12/10/2023)
 *
 * @param date ISO date string
 * @returns Formatted date string
 */
export const friendlyReadDateFormat = (date: string): string => {
    const dt = DateTime.fromISO(date);
    const now = DateTime.now();
    // const now = DateTime.fromISO("2025-12-22") // Uncomment to test

    // https://moment.github.io/luxon/#/math?id=diffs
    const diff = dt.diff(now, ['days', 'hours']).toObject();

    // If the event is in the past, then show the full date
    // https://moment.github.io/luxon/#/math?id=comparing-datetimes
    if (dt < now) {
        return dt.toFormat('dd/MM/yyyy');
    }

    // If the event is less than a week from now
    if (diff.days !== undefined && diff.days < 7) {
        if (diff.days < 1) {
            // Less than a day from now
            const hours = Math.round(diff.hours || 0);
            return hours <= 1 ? 'in 1 hour' : `in ${hours} hours`;
        } else {
            // Between 1 and 7 days from now
            const days = Math.round(diff.days);
            return days === 1 ? 'in 1 day' : `in ${days} days`;
        }
    }

    // More than a week from now, then show the full date
    return dt.toFormat('dd/MM/yyyy');
}

/**
 * Format date in a friendly way by showing the month and day
 * e.g. "JAN\n12"
 *
 * @param date ISO date string
 * @param lineBreak break the date into two lines
 * @returns Formatted date string
 */
export const shortDateFormat = (date: string, lineBreak: boolean = true): string => {
    const dt = DateTime.fromISO(date);
    const month = dt.toFormat('MMM').toUpperCase();
    const day = dt.toFormat('dd');
    if (!lineBreak) return `${month} ${day}`;
    return `${month}\n${day}`;
}

/**
 * Format date in a friendly way by showing the day, month and year
 * e.g. "Sat, 13 Sep 2025"
 *
 * @param date ISO date string
 * @returns Formatted date string
 */
export const longDateFormat = (date: string): string => {
    const dt = DateTime.fromISO(date);
    return dt.toFormat('ccc, dd MMM yyyy');
}

/**
 * Calculate the duration between two dates
 *
 * @param startDate ISO date string
 * @param endDate ISO date string
 * @returns Object containing hours and minutes
 */
export const timeDuration = (startDate, endDate): timeDuration => {
    const startDateTime = DateTime.fromISO(startDate);
    const endDateTime = DateTime.fromISO(endDate);

    // Calculate the duration
    const duration = endDateTime.diff(startDateTime);

    return {
        hours: Math.floor(duration.as('hours')),
        minutes: Math.floor(duration.as('minutes') % 60)
    };
}

/**
 *  Returns the part of the date
 *  e.g. getDatePart("2025-01-01", "year") returns 2025
 *
 * @param date ISO date string
 * @param part year, month, day, hour, minute
 * @returns part of the date
 */
export const getDatePart = (date: string, part: DatePartEnum): number => {
    const dateTime = DateTime.fromISO(date);
    let datePart = null;

    switch (part.toLowerCase()) {
        case DatePartEnum.YEAR:
            datePart = dateTime.year;
            break;
        case DatePartEnum.MONTH:
            datePart = dateTime.month;
            break;
        case DatePartEnum.DAY:
            datePart = dateTime.day;
            break;
        case DatePartEnum.HOUR:
            datePart = dateTime.toFormat('HH');
            break;
        case DatePartEnum.MINUTE:
            datePart = dateTime.minute;
            break
        default:
            throw new Error(`Unsupported part: ${part}. Supported parts are: year, month, day, hour, minute`);
    }

    return Number(datePart)
}

/**
 * Format date in Euro format
 * e.g. "12/10/2023"
 *
 * @param date ISO date string
 * @returns Formatted date string
 */
export const getEuroDate = (date: string): string => {
    const dt = DateTime.fromISO(date);
    return dt.toFormat('dd/MM/yyyy');
}

/**
 * Extract time from a date string in HH:MM format
 *
 * @param date ISO date string
 * @returns Formatted time as HH:MM
 */
export const getTime = (date: string): string => {
    const dateTime = DateTime.fromISO(date);
    return dateTime.toFormat('HH:mm');
}
