import './App.css'
import EventsList from "./components/EventsList.tsx";
import useEvents from "./hooks/useEvents.tsx";
import {useContext, useEffect} from "react";
import {CalendarCtx} from "./stores/calendar/calendarCtx.ts";


function App() {

    const { data: calendarEvents, error, isLoading } = useEvents()
    const { calendarCtxData: {events}, calendarCtxDispatcher } = useContext(CalendarCtx)

    useEffect(() => {
        if (calendarEvents.length > 0) {
            calendarCtxDispatcher({
                type: "SIMPLE_APPEND",
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
