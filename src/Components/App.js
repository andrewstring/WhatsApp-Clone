import '../css/App.css';
import { useState, useEffect } from "react"

// Components
import Conversations from './Conversations';
import Chat from "./Chat";
// Realm import
import * as Realm from "realm-web";
// Axios import
import axios from 'axios';

// Realm setup
const realmApp = new Realm.App({ id: "whatsapp-clone-nrzrz"})
// Axios setup
axios.defaults.baseURL = "http://localhost:3005"

function App() {

  // chatRooms and messages state variables
  const [ chatRooms, setChatRooms] = useState([])
  const [ currentChatRoomId, setCurrentChatRoomId ] = useState("")
  const [ messages, setMessages ] = useState([])

  // Mongo state variables
  const [ mongodb, setMongodb ] = useState()
  const [ chatRoomMonitoring, setChatRoomMonitoring ] = useState(false)
  const [ messageMonitoring, setMessageMonitoring ] = useState(false)

  useEffect(() => {
    const connectDB = async () => {
      try {
        await realmApp.logIn(Realm.Credentials.anonymous())
        const mongodbConnection = realmApp.currentUser.mongoClient("mongodb-atlas")
        setMongodb(mongodbConnection)
      } catch (e) {
        console.log("ERROR CONNECTING TO DATABASE")
      }
    }
    connectDB()
  }, [])

  useEffect(() => {
    const chatRoomFetch = async () => {
        const chatRoomsResponse = await axios.get("/chatroom/getChatRooms")
        if (chatRoomsResponse.data.length) {
          const sortedChatRooms = [...chatRoomsResponse.data]
          console.log(sortedChatRooms)
          sortedChatRooms.sort((a,b) => (new Date(b.lastMessageDate) - new Date(a.lastMessageDate)))
          setChatRooms([...sortedChatRooms])
          setCurrentChatRoomId(sortedChatRooms[0]._id.toString())
        }
    }
    if (mongodb) {
      chatRoomFetch()
    }
  }, [mongodb])

  useEffect(() => {

    const messagesFetch = async () => {
      try {
        const messagesResponse = await axios.get(`/message/getFromChatRoom/${currentChatRoomId}`)
        setMessages(() => [...messagesResponse.data])
      } catch (e) {
        console.log("ERROR with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      }
    }
    if (currentChatRoomId) {
      messagesFetch()
    }
  }, [currentChatRoomId])

  const updateChatRoomId = (id) => {
    return () => {
      setCurrentChatRoomId(id)
    }
  }

  useEffect(() => {
    const monitorChatRooms = async () => {
      if (mongodb && !chatRoomMonitoring) {
        setChatRoomMonitoring(true)
        const chatRoomsCollection = mongodb.db("test").collection("chatrooms")
        for await (const change of chatRoomsCollection.watch()) {
          if(change.ns.coll === "chatrooms") {
            if(change.operationType === "insert") {
              setChatRooms((chatRooms) => [change.fullDocument, ...chatRooms])
            } else if (change.operationType === "update") {
              setChatRooms((chatRooms) => {
                const newChatRooms = chatRooms.filter((chatRoom) => {
                  return change.fullDocument._id.toString() !== chatRoom._id.toString()
                })
                return [change.fullDocument, ...newChatRooms]
              })
            }
          }
        }
      }
    }
    const monitorMessages = async () => {
      if (mongodb && !messageMonitoring) {
        setMessageMonitoring(true)
        const messagesCollection = mongodb.db("test").collection("messages")
        for await (const change of messagesCollection.watch()) {
          if (change.ns.coll === "messages") {
            if (change.operationType === "insert") {
              console.log("INSERT")
              console.log(change.fullDocument.chatRoom.toString())
              console.log(currentChatRoomId.toString())
              if(change.fullDocument.chatRoom.toString() === currentChatRoomId.toString()) {
                console.log("MATCHED CHAT")
                change.fullDocument.timeSent = change.fullDocument.timeSent.toString()
                setMessages((messages) => [...messages, change.fullDocument])
              }
              
            }
          }

        }
      }
    }
    if (currentChatRoomId) {
      monitorChatRooms()
      monitorMessages()
    }
  }, [mongodb])


  

  return (
      <div className="App-container">
        {<Conversations chatRooms={chatRooms} updateChatRoomId={updateChatRoomId} currentChatRoomId={currentChatRoomId}></Conversations>}
        {chatRooms && <Chat messages={messages} currentChatRoomId={currentChatRoomId}></Chat>}
      </div>
  );
}

export default App;
