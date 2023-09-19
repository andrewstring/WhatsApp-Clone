// react import
import { useState, useContext, useRef, useEffect } from 'react'

// css import
import "../css/Chat.css"

// component imports
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import MicIcon from '@mui/icons-material/Mic'
import Options from './Options'
import Message from './Message'

// library imports
import axios from 'axios'

// util imports
import { getDate, getTime } from '../util/date'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'

const Chat = (props) => {

    // state initialization
    const [ input, setInput ] = useState("")
    const [ chatSearch, setChatSearch ] = useState(false)
    const [ chatSearchInput, setChatSearchInput ] = useState("")
    const [ chatSearchQuery, setChatSearchQuery ] = useState("")
    const [ chatAvatarOptions, setChatAvatarOptions] = useState(false)

    // ref initialization
    const chatViewRef = useRef(null)
    const atBottom = useRef(true)

    // context initialization
    const credentials = useContext(CredentialsContext)

    // prop/helper functions
    const handleChatSearchInput = (e) => {
        e.preventDefault()
        setChatSearchInput(e.target.value)
        handleChatSearchQuery(e.target.value)
    }
    const handleChatSearch = () => {
        if (chatSearch) {
            setChatSearchQuery("")
            setChatSearchInput("")
        }
        setChatSearch((chatSearch) => !chatSearch)
    }
    const handleChatSearchQuery = (query) => {
        console.log("MESSAGES")
        console.log(props.messages)
        const messageQuery = props.messages.filter((message) => {
                return (
                    message.senderName.toLowerCase().includes(query.toLowerCase()) ||
                    message.content.toLowerCase().includes(query.toLowerCase()) ||
                    getTime(message.timeSent).toLowerCase().includes(query.toLowerCase())
                )
            }
        )
        console.log(messageQuery)
        
        setChatSearchQuery(messageQuery)
    }
    const handleScroll = () => {
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
    const handleChatAvatarOptions = () => {
        setChatAvatarOptions((chatAvatarOptions => !chatAvatarOptions))
    }
    const send = () => {
    }

    // useEffects
    useEffect(() => {
        if (atBottom.current) {
            chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight
        }
    })


    // rendering
    return (
        <div className="Chat">
            <div className="Chat-toolbar">
                <div className="Chat-toolbar-chatinfo">
                    <div className="Chat-toolbar-chatinfo-Avatar">
                        <Avatar
                        onClick={handleChatAvatarOptions}
                        ></Avatar>
                    </div>
                    
                    {chatAvatarOptions && <Options 
                    side="left"
                    handleExit={handleChatAvatarOptions}></Options>}
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>{props.currentChatRoom.name}</h2>
                        <h3>{`Last Seen: ${getDate(props.currentChatRoom.lastMessageDate)}`}</h3>
                    </div>
                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon
                    onClick={handleChatSearch}
                    className="Chat-icon"></SearchIcon>
                    <AttachFileIcon className="Chat-icon"></AttachFileIcon>
                    <MoreVertIcon className="Chat-icon"></MoreVertIcon>

                </div>
            </div>
            {chatSearch && <div className="Chat-toolbar-search">
                <input
                placeholder="Search messages in chat"
                value={chatSearchInput}
                onChange={(e) => handleChatSearchInput(e)}
                ></input>
            </div>}
            <div
            className="Chat-view"
            ref={chatViewRef}
            onScroll={handleScroll}>
                {(typeof chatSearchQuery !== "string") ? chatSearchQuery.map(message => {
                    return <Message message={message}></Message>
                }) 
                : props.messages.map(message => {
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