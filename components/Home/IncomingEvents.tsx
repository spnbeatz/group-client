import { PanelLabel, PanelIcon, Panel } from "../Panel"
import { Event } from "@mui/icons-material"
import {Calendar} from "@heroui/calendar";
import {parseDate} from "@internationalized/date";
import { List } from "../List";
import { BirthdayListItem } from "./Birthdays/BirthdayListItem";
import { Divider } from "@heroui/divider";

const events = [
    {
        type: 'birthday',
        user: {
            username: "Patryk P",
            avatar: "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png",
        }
    }
]

export const IncomingEvents = () => {
    return (
        <Panel>
            <PanelLabel 
                label="Incoming Events" 
                startContent={<PanelIcon Component={Event} />}
            />
            <Calendar 
                aria-label="Date (Uncontrolled)" 
                defaultValue={parseDate(new Date().toISOString().split('T')[0])} 
                className="text-tiny"
                
            />
            <Divider />
            <List>
                {events.map((event, index) => {
                    return (
                        <BirthdayListItem user={event.user} key={event.type + event.user + index}/>
                    )
                })}
            </List>
        </Panel>
    )
}