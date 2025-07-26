import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Avatar } from "@heroui/avatar";
import { EmoticonButton } from "../Buttons/EmoticonButton";
import { IComment } from "@/types/posts";
import { UserMinimal } from "@/types/user";
import { useState, useEffect, useRef } from "react";
import { SearchUserTagPopover } from "../Posts/SearchUserTagPopover";
import { Send } from "@mui/icons-material";



export const AnswerCommentForm = ({
    parentId,
    user,
    postId,
    sendComment
}: {
    parentId?: string | undefined | null,
    user?: UserMinimal | null,
    postId: string,
    sendComment: (comment: IComment) => void
}) => {

    const { userData } = useSelector((state: RootState) => state.auth);

    const [value, setValue] = useState<string>(user ? `@${user?.username} ` : "");
    const [searchPopover, setSearchPopover] = useState<boolean>(false);
    const [searchPopoverValue, setSearchPopoverValue] = useState<string>("");
    const editorRef = useRef<HTMLDivElement>(null);

    const addEmoji = (emoji: string) => {
        setValue(value + emoji);
    }

    const getLastMention = (text: string): string => {
        // Dzielimy tekst na słowa (mieszamy na podstawie spacji)
        const words = text.split(' ');

        // Sprawdzamy, czy ostatni element zaczyna się od '@'
        const lastWord = words[words.length - 1];

        // Jeśli ostatni element zaczyna się od '@', zwracamy go
        if (lastWord && lastWord.startsWith('@')) {
            setSearchPopover(true);
            return lastWord.slice(1);
        }

        setSearchPopover(false);
        return "";
    };

    useEffect(() => {
        setSearchPopoverValue(getLastMention(value));
    }, [value]);

    const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
        const editorText = event.currentTarget.textContent || '';  // Get plain text
        setValue(editorText);

        if (editorText.trim().endsWith('@')) {
            setSearchPopoverValue(editorText);
            setSearchPopover(true);
            console.log("it is @");
        }
    };

    useEffect(() => {
        console.log(searchPopover, "search popover value")
    }, [searchPopover])

    const formatText = (text: string): string => {

        return text.replace(/(\s|^)(@\w+)/g, (match, space, word) => {
            return space + `<span class="bg-blue-200 px-0.5 rounded-sm">${word}</span>`;
        });
    };


    useEffect(() => {
        console.log(value);
    }, [value])

    useEffect(() => {
        if (editorRef.current) {
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(editorRef.current, editorRef.current.childNodes.length);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [value, searchPopoverValue]);

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Sprawdzamy, czy naciśnięto Enter
        if (event.key === "Enter") {
            if (userData && parentId) {
                const comment: IComment = {
                    userId: userData?._id,
                    postId,
                    parentCommentId: parentId || null,
                    content: value
                }
                sendComment(comment);
                setValue("");
            }


            event.preventDefault();  // Zapobiegaj domyślnemu zachowaniu (np. wstawianiu nowej linii)
            // Dodaj tutaj akcje, które chcesz wykonać po naciśnięciu Enter
        }
    };

    const handleSendComment = () => {
        if (userData && parentId) {
            const comment: IComment = {
                userId: userData?._id,
                postId,
                parentCommentId: parentId || null,
                content: value

            }

            console.log("sending child comment: ", comment)
            sendComment(comment);
            setValue("");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full mt-4">
            <div className="w-full gap-2 flex flex-row justify-between items-start flex-shrink-0">
                <Avatar size="sm" src={userData?.avatar} className="flex-shrink-0 w-6 h-6" />
                <div
                    ref={editorRef}
                    contentEditable

                    autoFocus
                    onKeyDown={handleKeyDown}
                    className="editor text-slate-600"
                    onInput={handleInputChange}
                    dangerouslySetInnerHTML={{ __html: formatText(value) }}
                    style={{
                        padding: "5px",
                        borderRadius: "5px",
                        width: "100%",
                        minHeight: "30px",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        whiteSpace: "pre-wrap"
                    }}
                ></div>
                <div className="w-6 h-6 flex-shrink-0 flex justify-center items-center" onClick={() => handleSendComment()}>
                    <Send fontSize="small" color="action" />
                </div>
                <EmoticonButton addEmoji={addEmoji} className="w-5 h-5 flex-shrink-0" />
            </div>
            {searchPopover && <SearchUserTagPopover value={searchPopoverValue} />}
        </div>

    )
}