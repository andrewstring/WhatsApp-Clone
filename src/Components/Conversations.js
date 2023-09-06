import { useEffect, useState } from 'react'
import "../css/Conversations.css"
import ChatRoom from './ChatRoom'

// Material UI
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'

// Axios
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3005"


const Conversations = (props) => {

    return (
        <nav class="Conversations">
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
                <h2 className="Conversations-list-add">Add New Chat</h2>
                {props.chatRooms.map((room) => {
                    return <ChatRoom key={room._id} name={room.name} lastMessage={room.lastMessage}
                    getMessages={props.getMessages(room._id)}
                    ></ChatRoom>
                })}
            </div>

        </nav>
    )
}


export default Conversations