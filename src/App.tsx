import './App.css'
import EventsList from "./components/EventList/EventsList.tsx";
import useEvents from "./hooks/useEvents.ts";
import {useContext, useEffect} from "react";
import {CalendarCtx} from "./stores/calendar/calendarCtx.ts";
import {CalendarActionTypes} from "./stores/calendar/calendarReducer.ts";
import {PacmanLoader} from "react-spinners";

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

    if (isLoading) return <PacmanLoader size={16} color="#03787C"/>

    if (error) {
        return (
            <div className={"errorContainer"}>
                <h3>Error</h3>
                <p>An unexpected error occurred while processing your request. Please try again later or contact support if the problem persists.</p>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <>
            <EventsList/>
        </>
    )
}

export default App
