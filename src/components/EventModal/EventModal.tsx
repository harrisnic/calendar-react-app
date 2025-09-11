import type {CalendarEvent} from "../../types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent;
}


const resolveAsset = (path: string) => {
    // if BannerUrl is empty, return a default image as a placeholder
    if (path.length === 0) {
        return "https://picsum.photos/id/739/200/300"
    }
    return path;
}


const EventModal = ({isOpen, onClose, event}: Props) => {

    return (
        <div>
            dasfasfasfasfas
        </div>
    );
};

export default EventModal;
