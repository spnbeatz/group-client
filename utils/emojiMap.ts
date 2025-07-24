import LikeEmoji from "@/assets/reactions/like.png";
import LoveEmoji from "@/assets/reactions/love.png";
import AngryEmoji from "@/assets/reactions/angry.png";
import SadEmoji from "@/assets/reactions/sad.png";
import LaughEmoji from "@/assets/reactions/laugh.png";

export const getEmoji = (emoji: string) => {
    switch (emoji) {
        case "like":
            return LikeEmoji.src;
        case "love":
            return LoveEmoji.src;
        case "angry":
            return AngryEmoji.src;
        case "sad":
            return SadEmoji.src;
        case "laugh":
            return LaughEmoji.src;
        default:
            return "";
    }
};
