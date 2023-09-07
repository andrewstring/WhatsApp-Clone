import { useState } from 'react'
import "../css/ChatRoom.css"
import { Avatar } from '@mui/material'


const ChatRoom = (props) => {

    return (
        <div className="ChatRoom" onClick={props.setChatRoom} id={props.id}>
            <div className="ChatRoom-Avatar">
                <Avatar></Avatar>
            </div>
            <div className="ChatRoom-overview">
                <h2>{props.name}</h2>
                <p>{props.lastMessage}</p>
            </div>
        </div>
    )
}


export default ChatRoom