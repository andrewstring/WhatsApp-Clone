// react import
import { useState, useContext, useEffect } from 'react'

// css import
import "../css/Message.css"

// util import
import { getTime } from '../util/date'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'

// axios import
import axios from 'axios'

// axios setup
axios.defaults.baseURL = "http://localhost:3005"

const Message = ({ message }) => {

    const notFound = <h1>NOT FOUND</h1>

    const [ attachment, setAttachment ] = useState(
        message.attachment
        ? <img className="Message-attachment"></img>
        : null
    )
    console.log("MESSAGE")
    console.log(message)
    // context initialization
    const credentials = useContext(CredentialsContext)

    // useEffect functions
    useEffect(() => {
        const retrieveImage = async (id) => {
            if (message.attachment) {
                try {
                    const attachmentResponse = await axios.get(`/message/getimage/${message._id}`, {
                        responseType: "arraybuffer"
                    })
                    const image = new Blob([attachmentResponse.data])
                    setAttachment(
                        <img src={URL.createObjectURL(image)} className="Message-attachment"></img>
                    )
                } catch (e) {
                    setAttachment(notFound)
                }
                
                
            }
        }
        retrieveImage()
    }, [])



    // rendering
    return (
        <div className={"Message" + (message.sender.toString() === credentials._id ? " Message-sent" : "")}>
            <h2 className="Message-name">{message.senderName}</h2>
            {attachment}
            <p className="Message-content">{message.content}</p>
            <p className="Message-time">{getTime(message.timeSent)}</p>
        </div>
    )
}


export default Message