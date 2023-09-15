import { useState, useContext, useRef, useEffect } from 'react'
import "../css/Chat.css"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import MicIcon from '@mui/icons-material/Mic'

import axios from 'axios'

import Message from './Message'
import { CredentialsContext } from '../Contexts/CredentialsContext'

const Chat = (props) => {

    const chatViewRef = useRef(null)
    const atBottom = useRef(true)

    const credentials = useContext(CredentialsContext)

    const [ input, setInput ] = useState("")

    useEffect(() => {
        if (atBottom.current) {
            console.log(chatViewRef)
            chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight
        }
    })

    const handleScroll = () => {
        console.log(chatViewRef.current.scrollTop)
        console.log(chatViewRef.current.clientHeight)
        console.log(chatViewRef.current.scrollHeight)
        if(chatViewRef.current.scrollTop + chatViewRef.current.clientHeight >= chatViewRef.current.scrollHeight) {
            console.log("jkljkljk")
            atBottom.current = true
        } else {
            atBottom.current = false
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            axios.post("/message/new", {
                chatRoomId: props.currentChatRoom._id,
                messageContent: {
                    content: input,
                    sender: credentials._id,
                    received: true,
                }
            })
        } catch (e) {
            console.log("ERROR with Axios")
            console.log(e.response.data)
            console.log(e.response.status)
            console.log(e.response.headers)
        }
        
        setInput("")
    }

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const send = () => {
    }

    return (
        <div className="Chat">
            <div className="Chat-toolbar">
                <div className="Chat-toolbar-chatinfo">
                    <Avatar className="Chat-toolbar-chatinfo-hAvatar"></Avatar>
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>{props.currentChatRoom.name}</h2>
                        <h3>{`Last Seen: ${props.currentChatRoom.lastMessageDate}`}</h3>
                    </div>
                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon className="Chat-icon"></SearchIcon>
                    <AttachFileIcon className="Chat-icon"></AttachFileIcon>
                    <MoreVertIcon className="Chat-icon"></MoreVertIcon>

                </div>
            </div>
            <div
            className="Chat-view"
            ref={chatViewRef}
            onScroll={handleScroll}>
                {props.messages.map(message => {
                    return <Message message={message}></Message>
                })}
            </div>
            <div className="Chat-message">
                <div className="Chat-message-emoji">
                    <EmojiEmotionsIcon className="Chat-icon"></EmojiEmotionsIcon>
                </div>
                <div className="Chat-message-input">
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter a message" value={input} onChange={handleChange}></input>
                        <input className="Chat-message-input-submit" type="submit"></input>
                    </form>
                    
                </div>
                <div className="Chat-message-mic">
                    <MicIcon className="Chat-icon"></MicIcon>
                </div>
                
            </div>
        </div>
    )
}


export default Chat