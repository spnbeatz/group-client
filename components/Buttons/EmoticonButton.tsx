import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import EmojiPicker from "emoji-picker-react";
import { Image } from "@heroui/image";
import HappyFace from "@/assets/happy-face.png";

export const EmoticonButton = ({
    addEmoji,
    className
}:{
    addEmoji: (emoji: string) => void,
    className?: string
}) => {
    return (
        <Popover showArrow placement="bottom">
            <PopoverTrigger>
                <div className={`w-8 h-8 flex-shrink-0 ${className}`}>
                    <Image src={HappyFace.src} className="w-full h-full"/>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-1">
                <EmojiPicker 
                    className="text-sm w-1/2"
                    lazyLoadEmojis
                    searchDisabled
                    onEmojiClick={(emoji) => addEmoji(emoji.emoji)}
                />
            </PopoverContent>
        </Popover>

    )
}