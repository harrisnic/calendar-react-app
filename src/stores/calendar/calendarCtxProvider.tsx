import {useReducer} from 'react'
import type {ReactNode} from 'react'
import {CalendarCtx} from "./calendarCtx.ts";
import {calendarReducer, type CalendarState} from "./calendarReducer.ts";

interface Props {
    children?: ReactNode;
    initialState?: CalendarState;
}

// Define default initial state
const defaultInitialState: CalendarState = {
    selectedEvent: null,
    selectedDate: null,
    events: []
}

const calendarCtxProvider = ({ children, initialState = defaultInitialState }: Props) => {
    const [calendarCtxData, calendarCtxDispatcher] = useReducer(calendarReducer, initialState)

    return (
        <CalendarCtx.Provider value={{calendarCtxData, calendarCtxDispatcher}}>
            {children}
        </CalendarCtx.Provider>
    )
}

export default calendarCtxProvider
