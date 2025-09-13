import type {CalendarEvent} from "../../types";
import styles from "./EventModal.module.css";
import {FontIcon, Image, ImageFit} from '@fluentui/react';
import DOMPurify from 'dompurify';
import {longDateFormat, shortDateFormat} from "../../utils/dateUtils.ts";

interface IEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent;
}


const EventModal = ({isOpen, onClose, event}: IEventModalProps) => {

    if (!isOpen) return null;

    // Sanitize the HTML content
    const sanitizedDescription = DOMPurify.sanitize(event.Description);

    return (
        <div className={styles.modalContainer}>

            <div className={styles.modalHeader}>
                <div className={styles.modalHeaderImageContainer}>
                <Image
                        imageFit={ImageFit.cover}
                        src={event.BannerUrl}
                        alt="Event Banner"
                        width="100%"
                        height={330}
                    />
                </div>

                <div className={styles.modalHeaderInfoBox}>
                    <div className={styles.modalHeaderDateCloseBtn}>
                        <span className={styles.modalHeaderDateDisplay}>
                            {shortDateFormat(event.EventStartDate)}
                        </span>
                        <FontIcon onClick={onClose} iconName={"ChromeClose"} aria-label={"Close"} className={styles.closeBtn}/>
                    </div>
                    <div><h2>{event.Title}</h2></div>
                    <div>{event.Category}</div>
                </div>
            </div> {/* end of modalHeader */}

            <div className={styles.modalContent}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>

                <div className={styles.modalContentSiteInfo}>
                    <div className={styles.modalContentSiteDate}>
                        <p className="textBoldCap">Date and Time</p>
                        <p>{longDateFormat(event.EventStartDate)}{event.FullDayEvent ? " - Full Day Event" : ""}</p>
                    </div>
                    <div className={styles.modalContentSiteLocation}>
                        <p className="textBoldCap">Location</p>
                        <p>
                            {event.AddressLine1 ? event.AddressLine1 : ""}
                            <br/>

                        </p>
                    </div>
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
