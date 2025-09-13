import type {Address, CalendarEvent} from "../../types";
import styles from "./EventModal.module.css";
import {FontIcon, Image, ImageFit} from '@fluentui/react';
import DOMPurify from 'dompurify';
import {getEuroDate, getTime, longDateFormat, shortDateFormat} from "../../utils/dateUtils.ts";
import {formatAddress} from "../../utils/geoUtils.ts";
import * as React from "react";
import {generateICS} from "../../utils/calendarUtils.ts";

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

    // Load the banner image from the API or fallback to a default image
    const loadBannerImage = (url: string) => {
        if (url.length > 0) {
            return url;
        }
        return `${import.meta.env.VITE_REACT_APP_BASE_URL}/fallback-image.png`;
    }

    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div className={styles.modalContainer}>

                <div className={styles.modalHeader}>
                    <div className={styles.hdrBannerContainer}>
                        <Image
                            imageFit={ImageFit.cover}
                            src={loadBannerImage(event.BannerUrl)}
                            alt="Event Banner"
                            width="100%"
                            height="100%"
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
                    { event.Description &&
                        <div className={styles.contDescription}>
                            <p className="textBoldCap">Description</p>
                            <div className={styles.contDescriptionText} dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
                        </div>
                    }

                    <div className={styles.contSiteInfo}>
                        <div className={styles.contSiteDate}>
                            <p className="textBoldCap">Date and Time</p>
                            <p>{longDateFormat(event.EventStartDate)}{event.FullDayEvent ? " - Full Day Event" : ""}</p>
                            <p><a onClick={() => generateICS(event)}>Add to Calendar</a></p>
                        </div>

                        { address &&
                            <div>
                                <p className="textBoldCap">Location</p>
                                <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
                                <p><a href={"#"}>View Map</a></p>
                            </div>
                        }
                    </div> {/* end of modalContentSiteInfo */}
                </div> {/* end of modalContent */}

                <div className={styles.modalFooter}>
                    <div className={styles.ftrContent}>
                        <p>
                            Created by {event.Author} on {getEuroDate(event.Created)} at {getTime(event.Created)}
                            <br/>
                            Modified by {event.Editor} on {getEuroDate(event.Modified)} at {getTime(event.Modified)}
                        </p>
                    </div>
                </div> {/* end of modalFooter */}

            </div> {/* end of modalContainer */}
        </div> // end of modalWrapper
    );
};

export default EventModal;
