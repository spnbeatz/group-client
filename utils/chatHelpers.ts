import { MinUserProps, MessageProps, FormattedMessagesProps } from "@/types";
import { formatDate } from "@/config/dateFormat";


export const getFormattedParticipants = (participants: MinUserProps[], userId: string | undefined) => {
    if (participants && participants.length > 0) {
        // Filtrujemy uczestników, ignorując obecnego użytkownika
        const filteredParticipants = participants.filter(participant => participant._id !== userId);

        // Generowanie tekstu uczestników
        const labelText = filteredParticipants.map((participant, index) => {
            let participantText = participant.username;

            // Sprawdzamy, jaki separator dodać
            const separator = (index < filteredParticipants.length - 1) 
                ? ", " 
                : (filteredParticipants.length > 1 ? " and " : "");

            return participantText + separator;
        }).join(''); // Łączymy wszystkie imiona w jedną string

        // Jeśli lista jest zbyt długa, skracamy ją
        if (labelText.length > 15) {
            return labelText.slice(0, 15) + "...";
        }

        // Jeśli lista jest pusta, zwracamy "No participants"
        return labelText || "No participants";
    }
    
    return "No participants";
};


// helper function to get avatar of the first non-current user
export const getAvatar = (participants: MinUserProps[], userId: string) => {
    if (userId) {
        const participant = participants.find((user) => user._id !== userId);
        return participant ? participant.avatar : '';
    }
    return '';
};


export const formatMessages = (messages: any): FormattedMessagesProps[] => {
    // Przechowujemy zmodyfikowaną listę wiadomości
    const updatedMessages: FormattedMessagesProps[] = [];
    console.log(messages, "messages");

    messages.forEach((message: MessageProps) => {
        // Sprawdzamy, czy mamy już wiadomość w tej samej "grupie"
        const lastMessage = updatedMessages[updatedMessages.length - 1];

        if (
            lastMessage &&
            formatDate(message.date, "chat") === formatDate(lastMessage.date, "chat") && // Sprawdzamy, czy są w tej samej minucie
            message.user.username === lastMessage.user.username && // Sprawdzamy, czy to ta sama osoba
            !lastMessage.messages.some((msg) => msg.id === message.id) // Sprawdzamy, czy wiadomość o tym samym id nie jest już w grupie
        ) {
            // Jeśli tak, dodajemy wiadomość do tej samej grupy
            lastMessage.messages.push({
                message: message.messages[0], // Możesz zmienić na pełne wiadomości, jeśli to konieczne
                id: message.id || "", // Jeśli id jest opcjonalne, upewnij się, że ma domyślną wartość
            });
        } else {
            // Jeśli nie, tworzymy nową grupę dla tej wiadomości
            updatedMessages.push({
                date: message.date,
                user: message.user,
                messages: message.messages.map((msg) => ({
                    message: msg, // Przekształcamy wiadomości na obiekt
                    id: message.id || "", // Możesz także przypisać id wiadomości
                })),
            });
        }
    });

    // Ustawiamy zaktualizowaną listę wiadomości
    return updatedMessages;
};
