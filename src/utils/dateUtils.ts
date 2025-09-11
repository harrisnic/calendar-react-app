import { DateTime } from 'luxon';

/**
 * Format date in a friendly way for upcoming events
 * If the event is less than a week from now, display “in 3 days” or “in 10 hours”
 * Otherwise show the full date as (12/10/2023)
 *
 * @param date ISO date string
 */
const eventListDateFormat = (date: string) => {

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

export default eventListDateFormat;
