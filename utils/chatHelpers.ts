import { Message, FormattedMessagesProps } from "@/types/chat";
import { formatDate } from "@/config/dateFormat";
import { ChatParticipant } from "@/types/chat";


export const getFormattedParticipants = (participants: ChatParticipant[], userId: string | undefined) => {
    if (participants && participants.length > 0) {
        const filteredParticipants = participants.filter(participant => participant.id !== userId);
        const labelText = filteredParticipants.map((participant, index) => {
            let participantText = participant.username;
            const separator = (index < filteredParticipants.length - 1) 
                ? ", " 
                : (filteredParticipants.length > 1 ? " and " : "");

            return participantText + separator;
        }).join('');
        if (labelText.length > 15) {
            return labelText.slice(0, 15) + "...";
        }
        return labelText || "No participants";
    } 
    return "No participants";
};


export const getAvatar = (participants: ChatParticipant[], userId: string) => {
    if (userId) {
        const participant = participants.find((user) => user._id !== userId);
        return participant ? participant.avatar : '';
    }
    return '';
};


export const formatMessages = (messages: any): FormattedMessagesProps[] => {
    const updatedMessages: FormattedMessagesProps[] = [];
    console.log(messages, "messages");

    messages.forEach((message: Message) => {
        const lastMessage = updatedMessages[updatedMessages.length - 1];

        if (
            lastMessage &&
            formatDate(message.date, "chat") === formatDate(lastMessage.date, "chat") &&
            message.user.username === lastMessage.user.username &&
            !lastMessage.messages.some((msg) => msg.id === message.id)
        ) {
            lastMessage.messages.push({
                message: message.messages[0],
                id: message.id || "",
            });
        } else {
            updatedMessages.push({
                chatId: message.chatId,
                date: message.date,
                user: message.user,
                messages: message.messages.map((msg) => ({
                    message: msg,
                    id: message.id || "",
                })),
            });
        }
    });
    return updatedMessages;
};
