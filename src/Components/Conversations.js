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

    const [ chatRooms, setChatRooms] = useState([])
    const [ chatRoomIDs, setChatRoomIDs ] = useState(new Map())

    useEffect(() => {
        const chatRoomUseEffect = async () => {
            const chatRoomsResponse = await axios.get("/chatroom/getChatRooms")

            for (const room of chatRoomsResponse.data) {
                setChatRoomIDs(map => new Map(map.set(room._id, room.name)))
            }            
            setChatRooms([...chatRoomsResponse.data])

            console.log(chatRooms)

            const chatRoomsCollection = props.mongo.db("test").collection("chatrooms")
            for await (const change of chatRoomsCollection.watch()) {
                if (!(change.fullDocument._id in chatRoomIDs)) {
                    console.log("Not in")
                    setChatRooms(chatRooms => [...chatRooms, change])
                    setChatRoomIDs(map => new Map(map.set(change.fullDocument._id, change.fullDocument.name)))
                }
            }
        }
        chatRoomUseEffect()
    }, [])

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
                {chatRooms.map((room) => {
                return <ChatRoom key={room._id} name={room.name} lastMessage={room.lastMessage} onClick={props.getChatRoomMessages(room._id)}></ChatRoom>
                })}
            </div>

        </nav>
    )
}


export default Conversations