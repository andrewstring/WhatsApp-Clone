// react import
import { useState } from 'react'

// css import
import "../css/ChatRoom.css"

// component import
import { Avatar } from '@mui/material'


const ChatRoom = (props) => {
    // rendering
    return (
        <div className={"ChatRoom" + (props.active ? " ChatRoom-active" : "")} onClick={props.updateChatRoom} id={props.id}>
            <div className="ChatRoom-Avatar">
                <Avatar></Avatar>
            </div>
            <div className="ChatRoom-overview">
                <h2>{props.name || "*No Name!"}</h2>
                {props.lastMessage && <p>Last Message:</p>}
                <p>{props.lastMessage || "Start Chatting!"}</p>
            </div>
        </div>
    )
}


export default ChatRoom