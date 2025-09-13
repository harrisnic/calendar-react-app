import {useReducer} from 'react'
import type {ReactNode} from 'react'
import {CalendarCtx} from "./calendarCtx.ts";
import {calendarReducer, type CalendarState} from "./calendarReducer.ts";

interface ICalendarCtxProviderProps {
    children?: ReactNode;
    initialState?: CalendarState;
}

// Define default initial state
const defaultInitialState: CalendarState = {
    selectedEvent: null,
    events: []
}

const CalendarCtxProvider = ({ children, initialState = defaultInitialState }: ICalendarCtxProviderProps) => {
    const [calendarCtxData, calendarCtxDispatcher] = useReducer(calendarReducer, initialState)

    return (
        <CalendarCtx.Provider value={{calendarCtxData, calendarCtxDispatcher}}>
            {children}
        </CalendarCtx.Provider>
    )
}

export default CalendarCtxProvider
