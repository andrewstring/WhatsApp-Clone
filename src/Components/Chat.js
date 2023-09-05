import { useState } from 'react'
import "../css/Chat.css"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Message from './Message'

const Chat = (props) => {
    return (
        <div className="Chat">
            <div className="Chat-toolbar">
                <div className="Chat-toolbar-chatinfo">
                    <Avatar></Avatar>
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>Chat One</h2>
                        <h3>Last seen Fri, 03 2023 18:03:06 EST</h3>
                    </div>
                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon></SearchIcon>
                    <AttachFileIcon></AttachFileIcon>
                    <MoreVertIcon></MoreVertIcon>

                </div>
            </div>
            <div className="Chat-view">
                <Message></Message>
            </div>
            <div className="Chat-message"></div>
        </div>
    )
}


export default Chat