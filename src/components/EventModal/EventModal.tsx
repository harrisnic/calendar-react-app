import type {CalendarEvent} from "../../types";
import styles from "./EventModal.module.css";
import { Image, ImageFit } from '@fluentui/react';
import DOMPurify from 'dompurify';

interface IEventModalProps {
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


const EventModal = ({isOpen, onClose, event}: IEventModalProps) => {
    // Sanitize the HTML content
    const sanitizedDescription = DOMPurify.sanitize(event.Description);

    return (
        <div className={styles.modalContainer}>

            <div className={styles.modalHeader}>
                <div>
                    <Image
                        imageFit={ImageFit.center}
                        src={event.BannerUrl}
                        alt='Example of the image fit value "center" on an image larger than the frame.'
                        width={400}
                        height={200}

                    />
                </div>

                <div className={styles.modalHeaderTitle}>
                    <div>{event.EventStartDate}</div>
                    <div>{event.Title}</div>
                    <div>{event.Category}</div>
                </div>

            </div> {/* end of modalHeader */}

            <div className={styles.modalContent}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div> {/* end of modalContent */}

            <div className={styles.modalFooter}>
                <p>Created by {event.Author} on {event.Created} at</p>
                <p>Modified by {event.Editor} on {event.Modified} at</p>
            </div> {/* end of modalFooter */}

        </div>
    );
};

export default EventModal;
