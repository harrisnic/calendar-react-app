import { Text } from "@fluentui/react-components";
import { CalendarRegular } from "@fluentui/react-icons";

const EventsList = () => {

    return (
        <div className={ "events-list"}>
            <div>
                <CalendarRegular size={32} />
                <Text weight="regular">Upcoming Events</Text>
            </div>

        </div>
    );
};

export default EventsList;
