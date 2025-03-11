import { Panel, PanelIcon, PanelLabel } from "../Panel"
import { Group } from "@mui/icons-material"

export const SuggestedGroups = () => {
    return (
        <Panel>
            <PanelLabel
                label="Suggested Groups"
                startContent={<PanelIcon Component={Group}/>}
            />
        </Panel>
    )
}