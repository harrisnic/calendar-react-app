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
    SIMPLE_APPEND: "simpleAppend"
}

export const calendarReducer = (state: CalendarState, action: CalendarAction) => {
    switch (action.type) {
        case CalendarActionTypes.SIMPLE_APPEND:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
