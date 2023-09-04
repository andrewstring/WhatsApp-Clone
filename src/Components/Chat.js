import { useState } from 'react'
import "../css/Chat.css"

const Chat = (props) => {
    return (
        <div className="Chat">
            <div className="Chat-toolbar"></div>
            <div className="Chat-view"></div>
            <div className="Chat-message"></div>
        </div>
    )
}


export default Chat