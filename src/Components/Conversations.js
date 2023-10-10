// react import
import { useEffect, useState, useRef } from 'react'

// css import
import "../css/Conversations.css"

// components import
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'
import ChatRoom from './ChatRoom'
import Modal from './Modal'
import Popup from './Popup'

// util import
import { handleClickOutsideRef } from '../util/nav'

const Conversations = ({ chatRooms, updateChatRoom, currentChatRoom, expanded, handleConversationsExpand, handleAddChat, handleModifyAccount }) => {

    // state initialization
    const [ avatarPopup, setAvatarPopup ] = useState(false)

    // ref initialization
    const inputBar = useRef(null)
    const avatarPopupRef = useRef(null)
    const addChatModalRef = useRef(null)
    const conversationsRef = useRef(null)

    // prop/helper functions
    const handleFocusInputBar = (e) => {
        e.preventDefault()
        if (!(document.activeElement === inputBar.current)) {
            inputBar.current.focus()
        }
    }
    const handleAvatarPopup = () => {
        setAvatarPopup((avatarPopup) => !avatarPopup)
    }
    const handleClickOutsideAvatarPopup = (e) => {
        handleClickOutsideRef(avatarPopupRef, e, () => {
            handleAvatarPopup()
        })
    }
    const handleClickOutsideAddChatModal = (e) => {
        handleClickOutsideRef(addChatModalRef, e, () => {
            handleAddChat()
        })
    }
    const handleClickOutsideExpandedConversations = (e) => {
        handleClickOutsideRef(conversationsRef, e, () => {
            if (expanded) {
                handleConversationsExpand()
            }
        })
        
    }

    // useEffects
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideAvatarPopup)
        document.addEventListener("mousedown", handleClickOutsideExpandedConversations)
        document.addEventListener("keydown", handleClickOutsideAvatarPopup)
        document.addEventListener("keydown", handleClickOutsideExpandedConversations)

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideAvatarPopup)
            document.removeEventListener("mousedown", handleClickOutsideExpandedConversations)
            document.removeEventListener("keydown", handleClickOutsideAvatarPopup)
            document.removeEventListener("keydown", handleClickOutsideExpandedConversations)
        }
    })


    // rendering
    return (
        <nav
        ref={conversationsRef}
        className={`Conversations${expanded ? " expanded" : ""}`}>
            <div className="Conversations-toolbar">
                <div className="Conversations-toolbar-avatar clickable">
                    <a onClick={handleAvatarPopup}><Avatar></Avatar></a>
                    {avatarPopup && <Popup
                    PopupRef={avatarPopupRef}
                    side="top-left"
                    handleExit={handleAvatarPopup}
                    items={[["Modify Account",
                        () => {
                            handleConversationsExpand()
                            handleAvatarPopup()
                            handleModifyAccount()}
                    ]]}></Popup>}
                </div>
                <div className="Conversations-toolbar-buttons">
                    <a onClick={(e) => handleFocusInputBar(e)} className="clickable"><SearchIcon  
                    className="Conversations-icon"></SearchIcon></a>
                </div>
            </div>
            <div
            className="Conversations-search clickable"
            onClick={(e) => handleFocusInputBar(e)}>
                <a><SearchIcon className="Conversations-icon"></SearchIcon></a>
                <input className="Conversations-search-input" 
                ref={inputBar}
                placeholder="Search for message"></input>
            </div>
            <div className="Conversations-list">
                <h2 className="Conversations-list-add" onClick={() => {
                    handleAddChat()
                    handleConversationsExpand()
                    }}>
                    Add New Chat</h2>
                {chatRooms && chatRooms.map((room) => {
                    return <ChatRoom
                    key={room._id}
                    name={room.name}
                    lastMessage={room.lastMessage}
                    updateChatRoom={updateChatRoom(room)}
                    active={room._id.toString() === currentChatRoom._id.toString()}
                    onClick={updateChatRoom}
                    id={room._id}
                    ></ChatRoom>
                })}
            </div>
            
        </nav>
    )
}


export default Conversations