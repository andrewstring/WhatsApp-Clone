import { useEffect, useState, useRef } from 'react'
import "../css/Conversations.css"
import ChatRoom from './ChatRoom'

// Material UI
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'

const Conversations = (props) => {


    // const modal = useRef(modal)

    // const handleChatAdd = () => {
    //     modal.className = "Conversations-list-add-modal"

    // }

    const [ addingChat, setAddingChat ] = useState(false)


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
                <h2 className="Conversations-list-add" >
                    Add New Chat</h2>
                {props.chatRooms.map((room) => {
                    return <ChatRoom key={room._id} name={room.name} lastMessage={room.lastMessage}
                    updateChatRoomId={props.updateChatRoomId(room._id)}
                    active={room._id.toString() === props.currentChatRoomId.toString()} id={room._id}
                    ></ChatRoom>
                })}
            </div>
            <div className={"Conversations-list-add-modal" + (!addingChat ? " hidden" : "")}></div>

        </nav>
    )
}


export default Conversations