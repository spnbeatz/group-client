const notifyEndpoint = "http://localhost:4012/notifications";

export const getNotifyList = async (userId: string, token: string) => {
    try {
        const response = await fetch(notifyEndpoint + `/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const result = await response.json();

        if(response.ok) {
            
            console.log(result.message)
            return result.data;
        } else {
            console.log(result.message)
        }
    } catch (error) {
        console.log(error);
    }
} 