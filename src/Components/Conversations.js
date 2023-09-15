import { useEffect, useState, useRef } from 'react'
import "../css/Conversations.css"
import ChatRoom from './ChatRoom'

// Components
import Modal from './Modal'

// Material UI
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'

const Conversations = (props) => {

    const [ addingChat, setAddingChat ] = useState(false)
    const handleAddChat = () => {
        setAddingChat((addingChat) => !addingChat)
    }

    console.log("THISIS CHAT")
    console.log(props.currentChatRoom)


    return (
        <nav className="Conversations">
            <div className="Conversations-toolbar">
                <div className="Conversations-toolbar-avatar">
                    <a><Avatar></Avatar></a>
                </div>
                <div className="Conversations-toolbar-buttons">
                    <a><SearchIcon className="Conversations-icon"></SearchIcon></a>
                    <a><MessageIcon className="Conversations-icon"></MessageIcon></a>
                </div>
            </div>
            <div className="Conversations-search">
                <a><SearchIcon className="Conversations-icon"></SearchIcon></a>
                <input className="Conversations-search-input" placeholder="Search for message"></input>
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