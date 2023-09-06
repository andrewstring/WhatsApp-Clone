import '../css/App.css';
import { useState, useEffect } from "react"

import Conversations from './Conversations';
import Chat from "./Chat";
import * as Realm from "realm-web";

// Axios
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3005"

const realmApp = new Realm.App({ id: "whatsapp-clone-nrzrz"})

function App() {

  // const getChatRoomMessages = (roomId) => {
  //   return async (roomId) => {
  //     const messagesResponse = await axios({
  //       method: "get",
  //       url: "/message/getFromChatRoom",
  //       data: {
  //         _id: "64f8b56542369a47d2475e92"
  //       }
  //     })
  //     setMessages(messages => [...messages,...messagesResponse])
  //   }
  // }


  const [ mongoRealtime, setMongoRealtime ] = useState()
  const [ chatRooms, setChatRooms] = useState([])
  const [ chatRoomIDs, setChatRoomIDs ] = useState(new Map())
  const [ messages, setMessages ] = useState([])
  const [ messagesIDs, setMesagesIDs ] = useState(new Map())

  const getMessages = (chatId) => {
    return async () => {
      const messagesResponse = await axios.get(`/message/getFromChatRoom/${chatId}`)
      console.log(messagesResponse.data)
      setMessages((messages) => [...messages, ...messagesResponse.data])
    }
  }

  useEffect(() => {
    const login = async () => {

      const chatRoomsResponse = await axios.get("/chatroom/getChatRooms")
      for (const room of chatRoomsResponse.data) {
          setChatRoomIDs(new Map(chatRoomIDs.set(room._id.toString(), room.name)))
      }            
      setChatRooms([...chatRoomsResponse.data])
      // getMessages(chatRooms[0]._id)

      const realmUser = await realmApp.logIn(Realm.Credentials.anonymous())
      const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas")
      const chatRoomsCollection = mongodb.db("test").collection("chatrooms")

      for await (const change of chatRoomsCollection.watch()) {
          if (change && !(chatRoomIDs.has(change.fullDocument._id.toString()))) {
              setChatRoomIDs(new Map(chatRoomIDs.set(change.fullDocument._id.toString(), change.fullDocument.name)))
              setChatRooms(chatRooms => [...chatRooms, change.fullDocument])
          }
        }
    }
    login()
  }, [])

  return (
      <div className="App-container">
        {<Conversations chatRooms={chatRooms} getMessages={getMessages}></Conversations>}
        {chatRooms && <Chat messages={messages}></Chat>}
      </div>
  );
}

export default App;
