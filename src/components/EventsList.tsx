import { Text } from "@fluentui/react-components";
import { CalendarRegular } from "@fluentui/react-icons";
import {useContext, useState} from "react";
import {CalendarCtx} from "../stores/calendar/calendarCtx.ts";
import type {CalendarEvent} from "../types";
import EventModal from "./EventModal.tsx";
import {CalendarActionTypes} from "../stores/calendar/calendarReducer.ts";

const EventsList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { calendarCtxData: {events, selectedEvent}, calendarCtxDispatcher } = useContext(CalendarCtx)

    const handleEventSelect = (event: CalendarEvent) => {
        console.log(event)
        calendarCtxDispatcher({
            type: CalendarActionTypes.SIMPLE_APPEND,
            payload: {
                selectedEvent: event
            }
        })
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={ "events-list"}>
            <div>
                <CalendarRegular size={32} />
                <Text weight="regular">Upcoming Events</Text>
            </div>

            {!(events) || events.length === 0 ? (
                <Text>No upcoming events</Text>
            ) : (
                <div>
                    {events.map((event) => (
                        <div key={event.ID}>
                            <Text onClick={() => { handleEventSelect(event) }}>{event.Title}</Text>
                        </div>
                    ))}
                </div>
            )}


            {selectedEvent && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    event={selectedEvent}
                />
            )}

        </div>
    );
};

export default EventsList;
