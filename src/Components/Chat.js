// react import
import { useState, useContext, useRef, useEffect } from 'react'

// css import
import "../css/Chat.css"

// component imports
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import MicIcon from '@mui/icons-material/Mic'
import Popup from './Popup'
import Message from './Message'

// library imports
import axios from 'axios'

// util imports
import { getDate } from '../util/date'
import { handleClickOutsideRef } from '../util/nav'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'
import SpeechRec from './SpeechRec'


const Chat = ({ currentChatRoom, messages, handleConversationsExpand, handleModifyChatProfile, handleAttachmentModal, attachment }) => {

    // state initialization
    const [ input, setInput ] = useState("")
    const [ chatSearch, setChatSearch ] = useState(false)
    const [ chatSearchInput, setChatSearchInput ] = useState("")
    const [ chatSearchQuery, setChatSearchQuery ] = useState("")
    const [ chatAvatarPopup, setChatAvatarPopup] = useState(false)
    const [ chatToolbarPopup, setChatToolbarPopup ] = useState(false)
    const [ emojiSelection, setEmojiSelection ] = useState(false)
    const [ speechRec, setSpeechRec ] = useState(false)

    // ref initialization
    const chatViewRef = useRef(null)
    const atBottom = useRef(true)
    const chatAvatarPopupRef = useRef(null)
    const chatToolbarPopupRef = useRef(null)
    const emojiSelectionRef = useRef(null)

    // context initialization
    const credentials = useContext(CredentialsContext)

    // prop/helper functions
    const handleSpeechRec = () => {
        setSpeechRec((speechRec) => !speechRec)
    }

    const handleEmojiSelection = () => {
        setEmojiSelection((emojiSelection) => !emojiSelection)
    }
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
        const messageQuery = messages.filter((message) => {
                return (
                    message.content.toLowerCase().includes(query.toLowerCase())
                )
            }
        )
        setChatSearchQuery(messageQuery)
    }
    const handleScroll = () => {
        if(chatViewRef.current.scrollTop + chatViewRef.current.clientHeight >= chatViewRef.current.scrollHeight-5) {
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
                chatRoomId: currentChatRoom._id,
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
        }
        setInput("")
    }
    const handleChange = (event) => {
        setInput(event.target.value)
    }
    const handleChatAvatarPopup = () => {
        setChatAvatarPopup((chatAvatarPopup => !chatAvatarPopup))
    }
    const handleChatToolbarPopup = () => {
        setChatToolbarPopup((chatToolbarPopup => !chatToolbarPopup))
    }
    const send = () => {
    }
    const handleClickOutsideChatAvatarPopup = (e) => {
        handleClickOutsideRef(chatAvatarPopupRef, e, () => {
            handleChatAvatarPopup()
        })
    }
    const handleClickOutsideChatToolbarPopup = (e) => {
        handleClickOutsideRef(chatToolbarPopupRef, e, () => {
            handleChatToolbarPopup()
        })
    }
    const handleClickOutsideEmojiSelection = (e) => {
        handleClickOutsideRef(emojiSelectionRef, e, () => {
            handleEmojiSelection()
        })
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideChatAvatarPopup)
        document.addEventListener("mousedown", handleClickOutsideChatToolbarPopup)
        document.addEventListener("mousedown", handleClickOutsideEmojiSelection)

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideChatAvatarPopup)
            document.removeEventListener("mousedown", handleClickOutsideChatToolbarPopup)
            document.removeEventListener("mousedown", handleClickOutsideEmojiSelection)
        }
    })
    const handleModifyChatRoom = () => {
        handleChatAvatarPopup()
        handleModifyChatProfile()
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
                <div
                className="Chat-toolbar-sidebar-activate"
                onClick={handleConversationsExpand}>
                    <QuestionAnswerIcon className="Chat-toolbar-sidebar-activate-icon"></QuestionAnswerIcon>

                </div>
                <div className="Chat-toolbar-chatinfo">
                    <div 
                    onClick={handleChatAvatarPopup}
                    className="Chat-toolbar-chatinfo-Avatar clickable">
                        <Avatar></Avatar>
                    </div>
                    
                    {chatAvatarPopup && <Popup 
                    PopupRef={chatAvatarPopupRef}
                    side="top-left"
                    handleExit={handleChatAvatarPopup}
                    items={[["Modify Chat Room", handleModifyChatRoom]]}></Popup>}
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>{currentChatRoom.name}</h2>
                        <h3>{`Last Seen: ${getDate(currentChatRoom.lastMessageDate)}`}</h3>
                    </div>


                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon
                    onClick={handleChatSearch}
                    className="Chat-icon clickable"></SearchIcon>
                    <AttachFileIcon
                    onClick={handleAttachmentModal}
                    className="Chat-icon clickable"></AttachFileIcon>
                    <MoreVertIcon 
                    onClick={handleChatToolbarPopup}
                    className="Chat-icon clickable"></MoreVertIcon>

                    {chatToolbarPopup && <Popup
                    PopupRef={chatToolbarPopupRef}
                    side="top-right"
                    handleExit={handleChatToolbarPopup}></Popup>}

                </div>
            </div>
            {chatSearch && <div className="Chat-toolbar-search">
                <input
                placeholder="Search messages in chat"
                value={chatSearchInput}
                className="Chat-toolbar-search-input"
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
                : messages.map(message => {
                    return <Message message={message}></Message>
                })}
            </div>
            <div className="Chat-message">
                {emojiSelection && <Popup 
                type="emoji"
                PopupRef={emojiSelectionRef}
                side="bottom-left"
                handleExit={handleEmojiSelection}></Popup>}
                <div
                onClick={handleEmojiSelection}
                className="Chat-message-emoji">
                    <EmojiEmotionsIcon className="Chat-icon"></EmojiEmotionsIcon>
                </div>
                <div className="Chat-message-input">
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter a message" value={input} onChange={handleChange}></input>
                        <input className="Chat-message-input-submit" type="submit"></input>
                    </form>
                    
                </div>
                {speechRec && <SpeechRec></SpeechRec>}
                <div className="Chat-message-mic">
                    <MicIcon className="Chat-icon" onClick={handleSpeechRec}></MicIcon>
                </div>
                
            </div>
            {attachment && <div className="Chat-attachment">JKJKLJKL</div>}
        </div>
    )
}

export default Chat