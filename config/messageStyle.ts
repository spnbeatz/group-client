import styled from "styled-components";

export const getMessageStyle = (index: any, message: any, owner: any) => {
    if (owner) {
        if (index === 0 && index !== message.length - 1) {
            return OwnerTopBubble;
        } else if (index === message.length - 1 && index !== 0) {
            return OwnerBottomBubble;
        } else if (index === message.length - 1) {
            return OneBubble;
        } else if (index !== 0 && index !== message.length - 1) {
            return OwnerMiddleBubble;
        }
    } else {
        if (index === 0 && index !== message.length - 1) {
            return TopBubble;
        } else if (index === message.length - 1 && index !== 0) {
            return BottomBubble;
        } else if (index === message.length - 1) {
            return OneBubble;
        } else if (index !== 0 && index !== message.length - 1) {
            return MiddleBubble;
        }
    }
};

const Bubble = styled.div`
    padding: 10px;
    margin: 5px;
    background-color: #f0f0f0;
    display: inline-block;
    max-width: 60%;
`;

const OwnerTopBubble = styled(Bubble)`
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
`;

const OwnerBottomBubble = styled(Bubble)`
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const TopBubble = styled(Bubble)`
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;

const BottomBubble = styled(Bubble)`
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const OneBubble = styled(Bubble)`
    border-radius: 25px;
`;

const MiddleBubble = styled(Bubble)`
    border-top-left-radius: 5px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 25px;
`;

const OwnerMiddleBubble = styled(Bubble)`
    border-top-left-radius: 25px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 5px;
`;

export { OwnerTopBubble, OwnerBottomBubble, TopBubble, BottomBubble, OneBubble, MiddleBubble, OwnerMiddleBubble };