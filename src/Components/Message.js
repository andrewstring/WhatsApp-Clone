import { useState } from 'react'

import "../css/Message.css"


const Message = (props) => {
    return (
        <div className={"Message" + (props.sent ? " Message-sent" : "")}>
            <h2 className="Message-name">{props.message.sender}</h2>
            <p className="Message-content">{props.message.content}</p>
            <p className="Message-time">{props.message.timeSent}</p>
        </div>
    )
}


export default Message