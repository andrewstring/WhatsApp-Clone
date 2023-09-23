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
import Options from './Options'
import Message from './Message'

// library imports
import axios from 'axios'

// util imports
import { getDate } from '../util/date'
import { handleClickOutsideRef } from '../util/nav'

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'

const Chat = ({ currentChatRoom, messages, handleConversationsExpand }) => {

    // state initialization
    const [ input, setInput ] = useState("")
    const [ chatSearch, setChatSearch ] = useState(false)
    const [ chatSearchInput, setChatSearchInput ] = useState("")
    const [ chatSearchQuery, setChatSearchQuery ] = useState("")
    const [ chatAvatarOptions, setChatAvatarOptions] = useState(false)
    const [ chatToolbarOptions, setChatToolbarOptions ] = useState(false)
    const [ emojiSelection, setEmojiSelection ] = useState(false)

    // ref initialization
    const chatViewRef = useRef(null)
    const atBottom = useRef(true)
    const chatAvatarOptionsRef = useRef(null)
    const chatToolbarOptionsRef = useRef(null)
    const emojiSelectionRef = useRef(null)

    // context initialization
    const credentials = useContext(CredentialsContext)

    // prop/helper functions
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
    const handleChatAvatarOptions = () => {
        setChatAvatarOptions((chatAvatarOptions => !chatAvatarOptions))
    }
    const handleChatToolbarOptions = () => {
        setChatToolbarOptions((chatToolbarOptions => !chatToolbarOptions))
    }
    const send = () => {
    }
    const handleClickOutsideChatAvatarOptions = (e) => {
        handleClickOutsideRef(chatAvatarOptionsRef, e, () => {
            handleChatAvatarOptions()
        })
    }
    const handleClickOutsideChatToolbarOptions = (e) => {
        handleClickOutsideRef(chatToolbarOptionsRef, e, () => {
            handleChatToolbarOptions()
        })
    }
    const handleClickOutsideEmojiSelection = (e) => {
        handleClickOutsideRef(emojiSelectionRef, e, () => {
            handleEmojiSelection()
        })
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideChatAvatarOptions)
        document.addEventListener("mousedown", handleClickOutsideChatToolbarOptions)

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideChatAvatarOptions)
            document.removeEventListener("mousedown", handleClickOutsideChatToolbarOptions)
        }
    })

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
                    <QuestionAnswerIcon></QuestionAnswerIcon>

                </div>
                <div className="Chat-toolbar-chatinfo">
                    <div 
                    onClick={handleChatAvatarOptions}
                    className="Chat-toolbar-chatinfo-Avatar clickable">
                        <Avatar></Avatar>
                    </div>
                    
                    {chatAvatarOptions && <Options 
                    optionsRef={chatAvatarOptionsRef}
                    side="top-left"
                    handleExit={handleChatAvatarOptions}></Options>}
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>{currentChatRoom.name}</h2>
                        <h3>{`Last Seen: ${getDate(currentChatRoom.lastMessageDate)}`}</h3>
                    </div>
                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon
                    onClick={handleChatSearch}
                    className="Chat-icon clickable"></SearchIcon>
                    <AttachFileIcon className="Chat-icon clickable"></AttachFileIcon>
                    <MoreVertIcon 
                    onClick={handleChatToolbarOptions}
                    className="Chat-icon clickable"></MoreVertIcon>

                    {chatToolbarOptions && <Options
                    optionsRef={chatToolbarOptionsRef}
                    side="top-right"
                    handleExit={handleChatToolbarOptions}></Options>}

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
                {emojiSelection && <Options 
                optionsRef={emojiSelectionRef}
                side="bottom-left"
                handleExit={handleEmojiSelection}></Options>}
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
                <div className="Chat-message-mic">
                    <MicIcon className="Chat-icon"></MicIcon>
                </div>
                
            </div>
        </div>
    )
}

export default Chat