import type {CalendarEvent} from "../types";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent;
}

const EventModal = ({isOpen, onClose, event}: Props) => {
    return (
        <div><p>{event.Title}</p></div>
    );
};

export default EventModal;
