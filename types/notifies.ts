export interface NotifyProps {
    contentId: string,
    userId: string,
    isRead: boolean,
    content: string,
    sendAt: string,
    type: string,
}

export interface NotifyComponentProps extends NotifyProps {
    onRemove: () => void
}