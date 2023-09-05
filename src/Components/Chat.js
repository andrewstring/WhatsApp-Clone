import { useState } from 'react'
import "../css/Chat.css"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import MicIcon from '@mui/icons-material/Mic'

import Message from './Message'

const Chat = (props) => {
    return (
        <div className="Chat">
            <div className="Chat-toolbar">
                <div className="Chat-toolbar-chatinfo">
                    <Avatar className="Chat-toolbar-chatinfo-Avatar"></Avatar>
                    <div className="Chat-toolbar-chatinfo-nametime">
                        <h2>Chat One</h2>
                        <h3>Last seen Fri, 03 2023 18:03:06 EST</h3>
                    </div>
                </div>
                <div className="Chat-toolbar-buttons">
                    <SearchIcon className="Chat-icon"></SearchIcon>
                    <AttachFileIcon className="Chat-icon"></AttachFileIcon>
                    <MoreVertIcon className="Chat-icon"></MoreVertIcon>

                </div>
            </div>
            <div className="Chat-view">
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
                <Message sent={false}></Message>
                <Message sent={true}></Message>
            </div>
            <div className="Chat-message">
                <div className="Chat-message-emoji">
                    <EmojiEmotionsIcon className="Chat-icon"></EmojiEmotionsIcon>
                </div>
                <div className="Chat-message-input">
                    <input placeholder="Enter a message"></input>
                </div>
                <div className="Chat-message-mic">
                    <MicIcon className="Chat-icon"></MicIcon>
                </div>
                
            </div>
        </div>
    )
}


export default Chat