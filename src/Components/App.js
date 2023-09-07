import '../css/App.css';
import { useState, useEffect } from "react"

// Components
import Conversations from './Conversations';
import Chat from "./Chat";

// Realm import
import * as Realm from "realm-web";

// Axios setup
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3005"

// Realm setup
const realmApp = new Realm.App({ id: "whatsapp-clone-nrzrz"})

function App() {

  // State initialization
  const [ chatRooms, setChatRooms] = useState([])
  const [ chatRoomIDs, setChatRoomIDs ] = useState(new Map())
  const [ currentChatRoomId, setCurrentChatRoomId ] = useState("")
  const [ messages, setMessages ] = useState([])
  const [ messagesIDs, setMessagesIDs ] = useState(new Map())

  // Retrieves messages...will be passed into Conversations component
  const setChatRoom = (chatId) => {
    return async () => {
      setCurrentChatRoomId(chatId)
      try {
        const messagesResponse = await axios.get(`/message/getFromChatRoom/${chatId}`)
        setMessagesIDs(new Map())
        for (const m of messagesResponse.data) {
          setMessagesIDs(new Map(messagesIDs.set(m._id.toString(), m.content)))
        }
        console.log(messagesResponse.data)
        setMessages(() => [...messagesResponse.data])
      } catch (e) {
        console.log("ERROR with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      }

      // login to mongodb realm and get chatrooms collection
      const realmUser = await realmApp.logIn(Realm.Credentials.anonymous())
      const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas")
      const chatRoomsCollection = mongodb.db("test").collection("messages")

      // use changestreams for detecting new/changes messages
      for await (const change of chatRoomsCollection.watch()) {
        if(change && !(messagesIDs.has(change.fullDocument._id.toString()) && (change.fullDocument.chatRoom == currentChatRoomId))) {
          setMessagesIDs(new Map(messagesIDs.set(change.fullDocument._id.toString(), change.fullDocument.content)))
          setMessages(messages => [{
            chatRoom: change.fullDocument.chatRoom.toString(),
            content: change.fullDocument.content,
            received: change.fullDocument.received,
            sender: change.fullDocument.sender,
            timeSent: change.fullDocument.timeSent.toString(),
            _id: change.fullDocument._id.toString()
          }, ...messages])
        }
      }
    }
  }

  useEffect(() => {
    const login = async () => {
      // do an initial fetch of the chatrooms
      try {
        const chatRoomsResponse = await axios.get("/chatroom/getChatRooms")
        for (const room of chatRoomsResponse.data) {
            setChatRoomIDs(new Map(chatRoomIDs.set(room._id.toString(), room.name)))
        }            
        setChatRooms([...chatRoomsResponse.data])
        setCurrentChatRoomId(chatRoomsResponse.data[0]._id)
      } catch (e) {
        console.log("ERROR with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      }

      // login to mongodb realm and get chatrooms collection
      const realmUser = await realmApp.logIn(Realm.Credentials.anonymous())
      const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas")
      const chatRoomsCollection = mongodb.db("test").collection("chatrooms")

      // use changestreams for detecting new/changed chatrooms
      for await (const change of chatRoomsCollection.watch()) {
          if (change && !(chatRoomIDs.has(change.fullDocument._id.toString()))) {
              setChatRoomIDs(new Map(chatRoomIDs.set(change.fullDocument._id.toString(), change.fullDocument.name)))
              setChatRooms(chatRooms => [...chatRooms, change.fullDocument.data])
          }
        }
    }
    login()
  }, [])

  return (
      <div className="App-container">
        {<Conversations chatRooms={chatRooms} setChatRoom={setChatRoom}></Conversations>}
        {chatRooms && <Chat messages={messages} currentChatRoomId={currentChatRoomId}></Chat>}
      </div>
  );
}

export default App;
