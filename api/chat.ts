import { Participant } from "@/types/chat";

const chatEndpoint = "http://localhost:5021/chats/";


export const createChat = async (participants: Participant[], token: string | null) => {

    const formData = new FormData();
    participants.forEach((participant, index) => {
        formData.append(`participants[${index}].username`, participant.username);
        formData.append(`participants[${index}].id`, participant.id);
        formData.append(`participants[${index}].avatar`, participant.avatar);
    })
    const response = await fetch(`${chatEndpoint}chat-api/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const error = await response.text();
        console.error("Error response:", error);
        throw new Error(`HTTP error! status: ${response.status} - ${error}`);
    }

    return await response.json();
}

export const getChatList = async (userId: string, token: string | null) => {
    console.log("token z getChatList", token)
    try{
        const response = await fetch(`${chatEndpoint}chat-api/chat-list/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    
        console.log(response.status, "respone status chat list");

        if(response.ok) {
            const data = await response.json();
            console.log("Chat List: ", data);
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Fetching chat list error: ", error);
        return null;
    }

}

export const getChatData = async (chatId:string, token: string | null) => {
    try {
        const response = await fetch(`${chatEndpoint}chat-api/chat/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if(response.ok) {
            const data = await response.json();
            console.log("Chat Data: ", data);
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Fetching chat data failed: ", error);
        return null;
    }

}

export const getMessages = async (chatId: string, skip: number, limit: number, token: string | null) => {
    try{
        const response = await fetch(`${chatEndpoint}chat-api/messages/${chatId}?limit=${limit}&skip=${skip}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    
        if(response.ok) {
            const messages = await response.json();
            return messages;
        } else {
            return []
        }
    } catch (error) {
        console.log("Error with fetching messages: ", error);
    }

}