export const createChat = async (participants: string[]) => {
    const response = await fetch("http://localhost:4000/chat-api/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participants)
    });

    if (!response.ok) {
        const error = await response.text();
        console.error("Error response:", error);
        throw new Error(`HTTP error! status: ${response.status} - ${error}`);
    }

    return await response.json();
}

export const getChatList = async (userId: string) => {
    try{
        const response = await fetch(`http://localhost:4000/chat-api/chat-list/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const getChatData = async (chatId:string) => {
    try {
        const response = await fetch(`http://localhost:4000/chat-api/chat/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const getMessages = async (chatId: string, limit: number) => {
    try{
        const response = await fetch(`http://localhost:4000/chat-api/messages/${chatId}?limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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