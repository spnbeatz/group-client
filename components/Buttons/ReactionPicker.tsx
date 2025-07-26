import { ReactionPickerButton } from "./ReactionPickerButton";

const reactions = ["like", "laugh", "angry", "love", "sad"]

export const ReactionPicker = ({
    contentId,
    addReaction
}: {
    contentId: string,
    addReaction: (type: string) => Promise<void>
}) => {

    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full p-2">
            {reactions.map((reaction, index) => {
                return <ReactionPickerButton reaction={reaction} key={reaction + index * 100} addReaction={addReaction} />
            })}
        </div>
    )
}