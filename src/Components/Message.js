import { useState } from 'react'

import "../css/Message.css"


const Message = (props) => {
    return (
        <div className={"Message" + (props.sent ? " Message-sent" : "")}>
            <h2 className="Message-name">Andrew</h2>
            <p className="Message-content">Yoo what is up</p>
            <p className="Message-time">Tue, 18 Aug 2020 04:00:00 EST</p>
        </div>
    )
}


export default Message