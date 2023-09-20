// react import
import { useState } from 'react'

// css import
import "../css/ChatRoom.css"

// component import
import { Avatar } from '@mui/material'


const ChatRoom = ({ active, updateChatRoom, id, name, lastMessage }) => {
    // rendering
    return (
        <div className={"ChatRoom" + (active ? " ChatRoom-active" : "")} onClick={updateChatRoom} id={id}>
            <div className="ChatRoom-Avatar">
                <Avatar></Avatar>
            </div>
            <div className="ChatRoom-overview">
                <h2>{name || "*No Name!"}</h2>
                {lastMessage && <p>Last Message:</p>}
                <p>{lastMessage || "Start Chatting!"}</p>
            </div>
        </div>
    )
}


export default ChatRoom