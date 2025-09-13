import type {CalendarEvent} from "../../types";

export interface CalendarState {
    selectedEvent?: CalendarEvent | null;
    events?: CalendarEvent[];
}

export interface CalendarAction {
    type: string;
    payload: CalendarState;
}

export const CalendarActionTypes = {
    ADD_SELECTED_EVENT: "addSelectedEvent",
    ADD_EVENTS: "addEvents",
    CLEAR_SELECTED_EVENT: "clearSelectedEvent",
}

export const calendarReducer = (state: CalendarState, action: CalendarAction) => {
    switch (action.type) {
        case CalendarActionTypes.ADD_SELECTED_EVENT:
        case CalendarActionTypes.ADD_EVENTS:
            return {...state, ...action.payload}
        case CalendarActionTypes.CLEAR_SELECTED_EVENT:
            return {...state, selectedEvent: null}
        default:
            return state;
    }
}
