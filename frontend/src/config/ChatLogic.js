export function GetSender(loggedUser, users) {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export function GetSenderData(loggedUser, users) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export function IsSameSender(messages, message, i, userId) {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== message.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export function IsLastMessage(messages, i, userId) {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
}

export function IsSameSenderMargin(messages, message, i, userId) {
    // same sender
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === message.sender._id &&
        messages[i].sender._id !== userId
    ) {
        return 33;
    }
    else if (
        (i < messages.length - 1 &&
        messages[i + 1].sender._id !== message.sender._id &&
        messages[i].sender._id !== userId) ||
            (i === messages.length - 1 && messages[i].sender._id !== userId) ){
        return 0;
    }
    
    else return 'auto'

};

export function IsSameUser(messages, message, i) {
    // if prev message sender == current message sender
    return (
        i > 0 &&
        messages[i - 1].sender._id === message.sender._id
    );
}
