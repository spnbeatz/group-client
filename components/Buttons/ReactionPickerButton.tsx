import { getEmoji } from "@/utils/emojiMap"

export const ReactionPickerButton = ({
    reaction,
    addReaction
}: {
    reaction: string,
    addReaction: (type: string) => Promise<void>
}) => {

    return (
        <div className="w-10 h-10 flex-shrink-0 flex justify-center items-center hover:scale-125 duration-200 cursor-pointer" onClick={async () => await addReaction(reaction)}>
            <img
                src={getEmoji(reaction)}
                className="w-full h-full"
            />
        </div>
    )
}