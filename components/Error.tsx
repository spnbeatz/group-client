import React from "react";

interface ErrorProps {
    errorType: string
}

const Error: React.FC<ErrorProps> = ({errorType}) => {
    return (
        <div>{errorType}</div>
    )
}

export default Error;