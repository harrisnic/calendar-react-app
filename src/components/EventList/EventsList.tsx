import {FontIcon, initializeIcons, Text} from "@fluentui/react";
import {useContext, useState} from "react";
import {CalendarCtx} from "../../stores/calendar/calendarCtx.ts";
import type {CalendarEvent} from "../../types";
import EventModal from "../EventModal/EventModal.tsx";
import {CalendarActionTypes} from "../../stores/calendar/calendarReducer.ts";
import styles from "./EventsList.module.css";
import {friendlyReadDateFormat} from "../../utils/dateUtils.ts";

initializeIcons();

const EventsList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { calendarCtxData: {events, selectedEvent}, calendarCtxDispatcher } = useContext(CalendarCtx)



    const handleEventSelect = (event: CalendarEvent) => {
        calendarCtxDispatcher({
            type: CalendarActionTypes.ADD_SELECTED_EVENT,
            payload: {
                selectedEvent: event
            }
        })
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);

        // Clear the selected event from the state
        calendarCtxDispatcher({
            type: CalendarActionTypes.CLEAR_SELECTED_EVENT,
            payload: {}
        })
    };

    // Sort the events based on EventStartDate
    const sortedEvents = events ? [...events].sort((a, b) => {
        return new Date(b.EventStartDate).getTime() - new Date(a.EventStartDate).getTime();
    }) : [];

    return (
        <>
            {!isModalOpen && (
                <div className={styles.eventsContainer}>
                    <div className={styles.eventsHeader}>
                        <FontIcon className={styles.eventsHeaderIcon} iconName={"Event"} aria-label={"Event"} />
                        <h2>Upcoming Events</h2>
                    </div>

                    {!(sortedEvents) || sortedEvents.length === 0 ? (
                        <Text>No upcoming events</Text>
                    ) : (
                        <div>
                            <ul className={styles.eventsGroup}>
                                {sortedEvents.map((event: CalendarEvent) => (
                                    <li key={event.ID} onClick={() => { handleEventSelect(event) }}>
                                        {event.Title} - {friendlyReadDateFormat(event.EventStartDate)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {selectedEvent && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    event={selectedEvent}
                />
            )}
        </>
    );
};

export default EventsList;
