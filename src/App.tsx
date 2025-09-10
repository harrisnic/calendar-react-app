import './App.css'
import EventsList from "./components/EventsList.tsx";
import useEvents from "./hooks/useEvents.tsx";


function App() {

    const { data, error, isLoading } = useEvents()

    return (
        <>
            <EventsList/>
        </>
    )
}

export default App
