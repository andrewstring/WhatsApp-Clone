import { useEffect, useState, useRef } from 'react'
import "../css/Conversations.css"
import ChatRoom from './ChatRoom'

// Components
import Modal from './Modal'
import Options from './Options'

// Material UI
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'

const Conversations = (props) => {

    const inputBar = useRef(null)
    const handleFocusInputBar = (e) => {
        e.preventDefault()
        if (!(document.activeElement === inputBar.current)) {
            inputBar.current.focus()
        }
    }

    const [ addingChat, setAddingChat ] = useState(false)
    const handleAddChat = () => {
        setAddingChat((addingChat) => !addingChat)
    }

    const [ avatarOptions, setAvatarOptions ] = useState(false)
    const handleAvatarOptions = () => {
        setAvatarOptions((avatarOptions) => !avatarOptions)
    }

    return (
        <nav className="Conversations">
            <div className="Conversations-toolbar">
                <div className="Conversations-toolbar-avatar">
                    <a onClick={handleAvatarOptions}><Avatar></Avatar></a>
                    {avatarOptions && <Options handleExit={handleAvatarOptions}></Options>}
                </div>
                <div className="Conversations-toolbar-buttons">
                    <a onClick={(e) => handleFocusInputBar(e)}><SearchIcon  
                    className="Conversations-icon"></SearchIcon></a>
                    {/* <a><MessageIcon className="Conversations-icon"></MessageIcon></a> */}
                </div>
            </div>
            <div
            className="Conversations-search"
            onClick={(e) => handleFocusInputBar(e)}>
                <a><SearchIcon className="Conversations-icon"></SearchIcon></a>
                <input className="Conversations-search-input" 
                ref={inputBar}
                placeholder="Search for message"></input>
            </div>
            <div className="Conversations-list">
                <h2 className="Conversations-list-add" onClick={handleAddChat}>
                    Add New Chat</h2>
                {props.chatRooms && props.chatRooms.map((room) => {
                    return <ChatRoom
                    key={room._id}
                    name={room.name}
                    lastMessage={room.lastMessage}
                    updateChatRoom={props.updateChatRoom(room)}
                    active={room._id.toString() === props.currentChatRoom._id.toString()}
                    onClick={props.updateChatRoom}
                    id={room._id}
                    ></ChatRoom>
                })}
            </div>
            {addingChat && <Modal type="addChat" handleAddChat={handleAddChat}></Modal>}
        </nav>
    )
}


export default Conversations