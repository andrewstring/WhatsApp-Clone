import { useState, useContext } from 'react'

// util func
import { getTime } from '../util/date'

import "../css/Message.css"
import { CredentialsContext } from '../Contexts/CredentialsContext'


const Message = (props) => {
    const credentials = useContext(CredentialsContext)

    console.log(props.message)

    return (
        <div className={"Message" + (props.message.sender.toString() === credentials._id ? " Message-sent" : "")}>
            <h2 className="Message-name">{props.message.senderName}</h2>
            <p className="Message-content">{props.message.content}</p>
            <p className="Message-time">{getTime(props.message.timeSent)}</p>
        </div>
    )
}


export default Message