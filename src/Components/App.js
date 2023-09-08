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
  const [ chatRoomHash, setChatRoomHash ] = useState(new Map())
  const [ currentChatRoomId, setCurrentChatRoomId ] = useState("")
  const [ messages, setMessages ] = useState([])
  const [ messageHash, setMessageHash ] = useState(new Map())

  const [ mongodb, setMongodb ] = useState()

  // Retrieves messages...will be passed into Conversations component
  const setChatRoomProp = (chatId) => {
    return async () => {
      
      try {
        const messagesResponse = await axios.get(`/message/getFromChatRoom/${chatId}`)
        setMessageHash(new Map())
        for (const m of messagesResponse.data) {
          setMessageHash(new Map(messageHash.set(m._id.toString(), m.content)))
        }
        setMessages(() => [...messagesResponse.data])
        setCurrentChatRoomId(chatId)
      } catch (e) {
        console.log("ERROR with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      }
    }
  }

  useEffect(() => {
    const connectDB = async () => {
      // do an initial fetch of the chatrooms
      try {
        const chatRoomsResponse = await axios.get("/chatroom/getChatRooms")
        for (const room of chatRoomsResponse.data) {
            setChatRoomHash(new Map(chatRoomHash.set(room._id.toString(), room.name)))
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
      const mongodbConnection = realmApp.currentUser.mongoClient("mongodb-atlas")
      setMongodb(mongodbConnection)
    }
      
    connectDB()
  }, [])

  useEffect(() => {
    const monitorChatRooms = async () => {
      if (mongodb) {
        const chatRoomsCollection = mongodb.db("test").collection("chatrooms")

        // use changestreams for detecting new/changed chatrooms
        for await (const change of chatRoomsCollection.watch()) {
          if (change && !(chatRoomHash.has(change.fullDocument._id.toString()))) {
            setChatRoomHash(new Map(chatRoomHash.set(change.fullDocument._id.toString(), change.fullDocument.name)))
            setChatRooms(chatRooms => [...chatRooms, change.fullDocument.data])
          } else if (change && chatRoomHash.has(change.fullDocument._id.toString())) {
            console.log(change)

            setChatRooms((chatRooms) => {
              return [
                change.fullDocument,
                ...(chatRooms.filter((room) => {
                  console.log(room)
                  return room && room._id != change.fullDocument._id.toString()
                }))
              ]
            })




            //TODO.....
            console.log("NEED TO UPDATE LATEST MESSAGE IN CHATROOM")
            //TODO.....
          }
        }
      }
    }
    monitorChatRooms()
    
  }, [mongodb])

  useEffect(() => {
    const monitorMessages = async () => {
      if (mongodb && currentChatRoomId) {
        const messagesCollection = mongodb.db("test").collection("messages")

        // use changestreams for detecting new/changes messages
        console.log("JKLJKLJKL")
        console.log(messageHash)
        for await (const change of messagesCollection.watch()) {
          console.log("CHANGE ID")
          console.log(change.fullDocument._id.toString())
          console.log("MessageID")
          console.log(messageHash.has(change.fullDocument._id.toString()))
          if (change && !(messageHash.has(change.fullDocument._id.toString())) && (change.fullDocument.chatRoom.toString() == currentChatRoomId)) {
            console.log("ADDED MESSAGE")
            setMessageHash(new Map(messageHash.set(change.fullDocument._id.toString(), change.fullDocument.content)))
            setMessages(messages => [...messages, {
              chatRoom: change.fullDocument.chatRoom.toString(),
              content: change.fullDocument.content,
              received: change.fullDocument.received,
              sender: change.fullDocument.sender,
              timeSent: change.fullDocument.timeSent.toString(),
              _id: change.fullDocument._id.toString()
            }])
          }
        }
      }
    }
    monitorMessages()
  }, [mongodb, currentChatRoomId])


  
  console.log("ROMMO")
  console.log(chatRooms)

  return (
      <div className="App-container">
        {<Conversations chatRooms={chatRooms} setChatRoom={setChatRoomProp}></Conversations>}
        {chatRooms && <Chat messages={messages} currentChatRoomId={currentChatRoomId}></Chat>}
      </div>
  );
}

export default App;
