// react import
import { useState, useContext } from 'react'

// css import
import "../css/Message.css"

// util import
import { getTime } from '../util/date'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'

const Message = (props) => {
    // context initialization
    const credentials = useContext(CredentialsContext)

    // rendering
    return (
        <div className={"Message" + (props.message.sender.toString() === credentials._id ? " Message-sent" : "")}>
            <h2 className="Message-name">{props.message.senderName}</h2>
            <p className="Message-content">{props.message.content}</p>
            <p className="Message-time">{getTime(props.message.timeSent)}</p>
        </div>
    )
}


export default Message