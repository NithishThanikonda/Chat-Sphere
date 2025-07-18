import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { IsSameSender, IsLastMessage, IsSameSenderMargin, IsSameUser } from '../../config/ChatLogic'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return <ScrollableFeed>
        {messages && messages.map((message, i) => (
            <div style={{ display: 'flex' }} key={message._id}>
                {
                    (IsSameSender(messages, message, i, user._id)
                        || IsLastMessage(messages, i, user._id)
                    ) && (
                        <Tooltip
                            label={message.sender.name}
                            placement='bottom-start'
                            hasArrow
                        >
                            <div>
                                <Avatar
                                    mt='7px'
                                    mr={1}
                                    size='sm'
                                    cursor='pointer'
                                    name='message.sender.name'
                                    src={message.sender.pic}
                                />

                            </div>
                        </Tooltip>
                    )
                }
                <span
                    style={{
                        backgroundColor: `${message.sender._id === user._id ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'
                            }`,
                        borderRadius: '20px',
                        padding: '5px 15px',
                        maxWidth: '75%',
                        marginLeft : IsSameSenderMargin(messages, message, i, user._id),
                        marginTop : IsSameUser(messages, message, i) ? '5px' : '10px'
                    }}
                >
                    {message.content}
                </span>
            </div>
        ))}
    </ScrollableFeed>
}

export default ScrollableChat
