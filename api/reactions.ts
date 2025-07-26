import { ReactionProps } from "@/types/f";

const reactionsEndpoint = "http://localhost:5021/interactions";


export const addReaction = async (token: string | null, reaction: ReactionProps) => {

    const formData = new FormData();
    Object.entries(reaction).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        formData.append(key, value.toString()); // Zapewnia, że wartość jest stringiem
    });

    console.log(formData.get("userId"), "formdata userid")

    if(formData) {
        const response = await fetch(`${reactionsEndpoint}/reactions/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
    
        const result = await response.json();
    
        console.log(result.message);

        return result;
    }


}

export const countReactions = async (token: string, contentId: string) => {
    const response = await fetch(`${reactionsEndpoint}/reactions/summary/${contentId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = await response.json();

    if(response.ok) {
        
        return result
    }
}

export const findReaction = async (token: string | null, userId: string, contentId: string) => {
    const response = await fetch(`${reactionsEndpoint}/reactions/find/${contentId}/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const result = await response.json();
    return result;
}