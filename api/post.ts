import { PostsFilter } from "@/types/posts";

const postsEndpoint = "http://localhost:5021/posts";

export const sendPostData = async (
    files: File[], 
    postContent: { text: string, user: string | undefined },
    token: string | null
) => {
    const formData = new FormData();
    formData.append("text", postContent.text); // Dodaj zawartość posta
    if(postContent.user) {
        formData.append("user", postContent.user);
    }


    

    // Dodaj pliki do formData
    files.forEach((file: File) => {
        formData.append("files", file); // Dodaj każdy plik w tablicy "files"
    });

    try {
        const response = await fetch(postsEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const result = await response.json();
            console.error('Error uploading files');
            return result
        }
    } catch (error) {
        console.error('Error:', error);
        return { status: "error", post: null}
    }
};

export const getPosts = async (limit: number, skip: number, token: string, filter: PostsFilter | null) => {
    try {
        // Tworzymy obiekt URLSearchParams, aby poprawnie obsługiwać parametry zapytania
        const urlParams = new URLSearchParams();
        urlParams.append('limit', String(limit));
        urlParams.append('skip', String(skip));
        
        // Tylko jeśli userId jest dostępne, dodajemy go do parametrów URL
        if (filter?.userId) {
            urlParams.append('userId', filter.userId);
        }

        console.log("URL: ", urlParams.toString())

        // Budujemy URL
        const url = `http://localhost:5021/posts?${urlParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log("Fetched posts: ", result);
            return result;
        } else {
            console.log("Cannot fetch posts");
        }
    } catch (error) {
        console.log("Server error while fetching posts");
    }
}
