import { useState } from 'react'
import "../css/ChatRoom.css"
import { Avatar } from '@mui/material'


const ChatRoom = (props) => {
    return (
        <div className="ChatRoom">
            <div className="ChatRoom-Avatar">
                <Avatar></Avatar>
            </div>
            <div className="ChatRoom-overview">
                <h2>This is the chat name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}


export default ChatRoom