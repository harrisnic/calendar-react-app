interface CalendarEvent {
    ID: number;
    Title: string;
    Category: string;
    BannerUrl: string;
    Description: string;
    AddressLine1: string;
    AddressLine2: string;
    PostCode: string | number;
    City: string;
    Country: string;
    EventStartDate: string;
    EventEndDate: string;
    FullDayEvent: "TRUE" | "FALSE";
    Author: string;
    Editor: string;
    Created: string;
    Modified: string;
}

export interface CalendarEventResponse {
    value: CalendarEvent[];
}
