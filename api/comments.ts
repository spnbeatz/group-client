import { CommentProps } from "@/types"

const commentsEndpoint = "http://localhost:5021/interactions"

export const sendComment = async (token: string | null, comment: CommentProps) => {
    console.log(comment, "I send this comment");
    console.log(token, "sendComment token")
    const formData = new FormData();
    Object.entries(comment).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        formData.append(key, value.toString()); // Zapewnia, że wartość jest stringiem
    });

    if(formData){
        console.log(formData.get("userId"), "setted form data")

        const response = await fetch(`http://localhost:5021/interactions/comments/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
    
        const result = await response.json();
        console.log(result.message);
        if(response.ok) {  
            return result;
        }
    }

}

export const getComments = async (token: string | null, postId: string, limit: number, skip: number) => {
    const response = await fetch(`${commentsEndpoint}/comments/${postId}?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json();
    console.log(data.message);
    console.log(data, "fetched comments")

    if(response.ok) {
        return {comments: data.comments, count: data.count};
    }
}

export const getChildComments = async (token: string | null, parentId: string) => {
    console.log("Getting child comments");
    const response = await fetch(`${commentsEndpoint}/comments/child/${parentId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json();

    console.log(data.message);

    if(response.ok){
        console.log("Fetched child comments");
        return {comments: data.comments, count: data.count, parentId: data.parentId};
    } else {
        return {comments: [], count: 0}
    }
}