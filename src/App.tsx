import './App.css'
import EventsList from "./components/EventList/EventsList.tsx";
import useEvents from "./hooks/useEvents.ts";
import {useContext, useEffect} from "react";
import {CalendarCtx} from "./stores/calendar/calendarCtx.ts";
import {CalendarActionTypes} from "./stores/calendar/calendarReducer.ts";

function App() {

    const { data: calendarEvents, error, isLoading } = useEvents()
    const { calendarCtxDispatcher } = useContext(CalendarCtx)

    useEffect(() => {
        if (calendarEvents.length > 0) {
            calendarCtxDispatcher({
                type: CalendarActionTypes.ADD_EVENTS,
                payload: {
                    events: calendarEvents
                }
            })
        }
    }, [calendarEvents])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <EventsList/>
        </>
    )
}

export default App
