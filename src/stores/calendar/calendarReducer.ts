import type {CalendarEvent} from "../../types";

export interface CalendarState {
    selectedEvent?: CalendarEvent | null;
    selectedDate?: Date | null;
    events?: CalendarEvent[];
}

export interface CalendarAction {
    type: string;
    payload: CalendarState;
}

export const CalendarActionTypes = {
    ADD_SELECTED_EVENT: "addSelectedEvent",
    ADD_EVENTS: "addEvents",
}

export const calendarReducer = (state: CalendarState, action: CalendarAction) => {
    switch (action.type) {
        case CalendarActionTypes.ADD_SELECTED_EVENT:
        case CalendarActionTypes.ADD_EVENTS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
