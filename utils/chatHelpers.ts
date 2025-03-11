import { MinUserProps } from "@/types";


export const getFormattedParticipants = (participants: MinUserProps[], userId: string | undefined) => {
    if (participants) {
        const labelText = participants.map((participant, index) => {
            if (participant.id !== userId) {
                let participantText = participant.username;
                const separator =
                    participants.length - 1 > 2
                        ? index > 1 && index !== participants.length - 2
                            ? ", "
                            : " and "
                        : participants.length === 2 && index !== participants.length - 2
                        ? " and "
                        : "";

                return participantText + separator;
            }
            return ''; // Ignore the current user
        }).join(''); // Join all names into one string

        if (labelText.length > 15) {
            return labelText.slice(0, 15) + "...";
        }

        return labelText || "No participants";
    }
    return "No participants";
};

// helper function to get avatar of the first non-current user
export const getAvatar = (participants: MinUserProps[], userId: string) => {
    if (userId) {
        const participant = participants.find((user) => user.id !== userId);
        return participant ? participant.avatar : '';
    }
    return '';
};
