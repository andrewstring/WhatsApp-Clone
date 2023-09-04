import { useState } from 'react'
import "../css/Conversations.css"
import ChatRoom from './ChatRoom'
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MessageIcon from '@mui/icons-material/Message'

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
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
                <ChatRoom></ChatRoom>
            </div>

        </nav>
    )
}


export default Conversations