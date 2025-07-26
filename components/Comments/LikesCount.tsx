import { Tooltip } from "@heroui/tooltip"
import { getEmoji } from "@/utils/emojiMap"
import { ReactionCounts } from "@/types/reactions"

export const LikesCount = ({
    counts
}: {
    counts: ReactionCounts | null | undefined
}) => {

    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <div className="flex flex-row items-center justify-center">
                {counts &&
                    Object.entries(counts.reactions).map(([reaction, value], index) => {
                        console.log(reaction, "reaction key");
                        return (
                            <Tooltip key={reaction} content={value.users[0] || ""}>
                                <div
                                    className={`w-5 h-5 relative hover:-translate-y-1 duration-200 ${index > 0 ? "-ml-2" : ""
                                        }`}
                                >
                                    <img src={getEmoji(reaction)} alt={reaction} />
                                </div>
                            </Tooltip>
                        );
                    })}

            </div>
            {counts && counts.total.count > 0 && <div className="text-md text-slate-600 cursor-pointer hover:underline">
                {counts?.total.count}
            </div>}
        </div>
    )
}