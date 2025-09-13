import type {Address, CalendarEvent} from "../types";
import {formatAddress} from "./geoUtils.ts";
import {DatePartEnum, getDatePart, timeDuration} from "./dateUtils.ts";
import * as ics from 'ics'
import {truncateText} from "./textUtils.ts";

/**
 * Generate an ICS file for a calendar event
 * @param calendarEvent
 */
export const generateICS = (calendarEvent: CalendarEvent) => {

    const address: Address = {
        AddressLine1: calendarEvent.AddressLine1,
        AddressLine2: calendarEvent.AddressLine2,
        PostCode: calendarEvent.PostCode,
        City: calendarEvent.City,
        Country: calendarEvent.Country,
    }

    const startArray = [
        getDatePart(calendarEvent.EventStartDate, DatePartEnum.YEAR),
        getDatePart(calendarEvent.EventStartDate, DatePartEnum.MONTH),
        getDatePart(calendarEvent.EventStartDate, DatePartEnum.DAY),
        getDatePart(calendarEvent.EventStartDate, DatePartEnum.HOUR),
        getDatePart(calendarEvent.EventStartDate, DatePartEnum.MINUTE),
    ];

    const formattedAddress = formatAddress(address, false);

    const icsEvent = {
        start: startArray,
        duration: timeDuration(calendarEvent.EventStartDate, calendarEvent.EventEndDate),
        title: calendarEvent.Title,
        description: truncateText(calendarEvent.Description, 40),
        organizer: { name: calendarEvent.Author },
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        ...(formattedAddress !== null && { location: formattedAddress })
    }

    ics.createEvent(icsEvent, (error, value) => {
        if (error) {
            console.log(error)
            return
        }

        if (value) {
            // Create the file to download
            const filename = `${calendarEvent.Title.replace(/\s+/g, '_')}.ics`;
            const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });

            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
        }

    })

}
