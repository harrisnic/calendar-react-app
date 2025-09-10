import {useReducer} from 'react'
import type {ReactNode} from 'react'
import type {CalendarEvent} from "../../types";
import {CalendarCtx} from "./calendarCtx.ts";
import {calendarReducer} from "./calendarReducer.ts";

interface Props {
    children?: ReactNode;
}

const CalendarCtxProvider = ({children}: Props) => {
    const [calendarCtxData, calendarCtxDispatcher] = useReducer(calendarReducer, {
        selectedEvent: null,
        selectedDate: null,
        events: [] as CalendarEvent[],
    })

    return (
        <CalendarCtx.Provider value={{calendarCtxData, calendarCtxDispatcher}}>{children}</CalendarCtx.Provider>
    )
}

export default CalendarCtxProvider
