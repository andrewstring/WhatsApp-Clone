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
    const [ mongoConnection, setMongoConnection ] = useState()

    useEffect(() => {
        const chatRoomUseEffect = async () => {
            const chatRooms = await axios.get("/chatroom/getChatRooms")
            setChatRooms([...chatRooms.data])
        }
        chatRoomUseEffect()

        const mongoListen = (async () => {
            const chatRoomCollection = props.mongo.db("whatsapp-clone").collection("chatrooms")
            console.log(chatRoomCollection)
            console.log(await chatRoomCollection.find())

            // for await (const change of chatRoomCollection.watch()) {
            //     // setChatRooms([...chatRooms, change])
            //     console.log(change)
            // }
        })
        mongoListen()
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
                {chatRooms.map((room) => <ChatRoom></ChatRoom>)}
            </div>

        </nav>
    )
}


export default Conversations