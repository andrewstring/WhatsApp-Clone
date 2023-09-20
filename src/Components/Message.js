// react import
import { useState, useContext } from 'react'

// css import
import "../css/Message.css"

// util import
import { getTime } from '../util/date'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'

const Message = ({ message }) => {
    // context initialization
    const credentials = useContext(CredentialsContext)

    // rendering
    return (
        <div className={"Message" + (message.sender.toString() === credentials._id ? " Message-sent" : "")}>
            <h2 className="Message-name">{message.senderName}</h2>
            <p className="Message-content">{message.content}</p>
            <p className="Message-time">{getTime(message.timeSent)}</p>
        </div>
    )
}


export default Message