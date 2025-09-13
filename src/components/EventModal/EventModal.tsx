import type {Address, CalendarEvent} from "../../types";
import styles from "./EventModal.module.css";
import {FontIcon, Image, ImageFit} from '@fluentui/react';
import DOMPurify from 'dompurify';
import {longDateFormat, shortDateFormat} from "../../utils/dateUtils.ts";
import {formatAddress} from "../../utils/geoUtils.ts";
import * as React from "react";

interface IEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent;
}

const EventModal = ({isOpen, onClose, event}: IEventModalProps) => {

    if (!isOpen) return null;

    // Sanitize the HTML content
    const sanitizedDescription = DOMPurify.sanitize(event.Description);

    const addressParts: Address = {
        'AddressLine1': event.AddressLine1,
        'AddressLine2': event.AddressLine2,
        'PostCode': event.PostCode,
        'City': event.City,
        'Country': event.Country
    };
    const address = formatAddress(addressParts);

    // Handle clicks outside the modal to close it
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking directly on the wrapper, not its children
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div className={styles.modalContainer}>

                <div className={styles.modalHeader}>
                    <div className={styles.hdrBannerContainer}>
                    <Image
                            imageFit={ImageFit.cover}
                            src={event.BannerUrl}
                            alt="Event Banner"
                            width="100%"
                            height={330}
                        />
                    </div>

                    <div className={styles.hdrSiteInfoBox}>
                        <div className={styles.hdrDateCloseBtn}>
                            <span className={styles.hdrDateDisplay}>
                                {shortDateFormat(event.EventStartDate)}
                            </span>
                            <FontIcon onClick={onClose} iconName={"ChromeClose"} aria-label={"Close"} className={styles.hdrCloseBtn}/>
                        </div>
                        <div><h2>{event.Title}</h2></div>
                        <div>{event.Category}</div>
                    </div>
                </div> {/* end of modalHeader */}

                <div className={styles.modalContent}>
                    <div className={styles.contDescription} dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
                    <div className={styles.contSiteInfo}>

                        <div className={styles.contSiteDate}>
                            <p className="textBoldCap">Date and Time</p>
                            <p>{longDateFormat(event.EventStartDate)}{event.FullDayEvent ? " - Full Day Event" : ""}</p>
                        </div>

                        { address &&
                            <div>
                                <p className="textBoldCap">Location</p>
                                <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
                            </div>
                        }
                    </div> {/* end of modalContentSiteInfo */}
                </div> {/* end of modalContent */}

                <div className={styles.modalFooter}>
                    <p>Created by {event.Author} on {event.Created} at</p>
                    <p>Modified by {event.Editor} on {event.Modified} at</p>
                </div> {/* end of modalFooter */}

            </div> {/* end of modalContainer */}
        </div> // end of modalWrapper
    );
};

export default EventModal;
