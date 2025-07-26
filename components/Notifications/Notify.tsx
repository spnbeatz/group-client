import { NotifyComponentProps } from "@/types/notifies";
import { motion } from "framer-motion";
import { useEffect } from "react";



export const Notify = ({ contentId, userId, isRead, content, sendAt, type, onRemove }: NotifyComponentProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onRemove])

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-80 h-auto p-4 bg-white shadow-md rounded-md relative"
        >
            <p className="text-sm text-gray-800">{content}</p>
            <button
                onClick={onRemove}
                className="absolute top-1 right-2 text-white bg-red-500 w-6 h-6 text-xs rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
                ✕
            </button>
        </motion.div>
    )
}