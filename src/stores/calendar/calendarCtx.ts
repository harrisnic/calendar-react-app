import type {Dispatch} from "react";
import {createContext} from "react";
import type {CalendarAction, CalendarState} from "./calendarReducer.ts";

interface CalendarCtxType {
    calendarCtxData: CalendarState;
    calendarCtxDispatcher: Dispatch<CalendarAction>
}

export const CalendarCtx = createContext<CalendarCtxType>({} as CalendarCtxType);
