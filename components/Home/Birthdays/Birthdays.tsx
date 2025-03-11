
import { Panel, PanelLabel, PanelIcon } from "../../Panel"
import { Cake } from "@mui/icons-material"
import { BirthdayListItem } from "./BirthdayListItem"

const birthdayUsers = [
    {
        username: "Patryk P",
        avatar: "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png",
        email: "spnbeatz@gmail.com"
    }
]

export const Birthdays = () => {
    return (
        <Panel>
            <PanelLabel 
                label="Today's birthdays" 
                startContent={<PanelIcon Component={Cake}/>}
            />
            { birthdayUsers.map((user) => {
                return (
                    <BirthdayListItem user={user} />
                )
            })}
        </Panel>
    )
}