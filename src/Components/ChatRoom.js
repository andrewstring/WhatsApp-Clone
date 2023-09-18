import { useState } from 'react'
import "../css/ChatRoom.css"
import { Avatar } from '@mui/material'


const ChatRoom = (props) => {
    console.log("PROPPY")
    console.log(props)

    return (
        <div className={"ChatRoom" + (props.active ? " ChatRoom-active" : "")} onClick={props.updateChatRoom} id={props.id}>
            <div className="ChatRoom-Avatar">
                <Avatar></Avatar>
            </div>
            <div className="ChatRoom-overview">
                <h2>{props.name || "*No Name!"}</h2>
                <p>Last Message:</p>
                <p>{props.lastMessage || "Start Chatting!"}</p>
            </div>
        </div>
    )
}


export default ChatRoom