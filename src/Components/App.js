import '../css/App.css';
import { useState, useEffect, useRef } from "react"

// Components
import Login from './Login';
import Conversations from './Conversations';
import Chat from "./Chat";

// Context
import { CredentialsContext } from '../Contexts/CredentialsContext';
import { MongodbContext } from '../Contexts/MongodbContext';

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
  const [ credentials, setCredentials ] = useState("invalid")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ chatRooms, setChatRooms] = useState([])
  const [ currentChatRoom, setCurrentChatRoom ] = useState("")
  const [ messages, setMessages ] = useState([])

  // Mongo state variables
  const [ mongodb, setMongodb ] = useState()

  const chatRoomMonitoring = useRef(false)

  const appSetCredentials = (cred) => {
    setCredentials(cred)
  }

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
      try {
        if (credentials != "invalid") {
          const chatRoomsResponse = await axios.get(`/chatroom/getChatRooms/${credentials._id}`)
          console.log("RESPONSE")
          console.log(chatRoomsResponse)
          if (chatRoomsResponse.data.length) {
            const sortedChatRooms = [...chatRoomsResponse.data]
            sortedChatRooms.sort((a,b) => (new Date(b.lastMessageDate) - new Date(a.lastMessageDate)))
            if (sortedChatRooms) {
              setChatRooms([...sortedChatRooms])
              setCurrentChatRoom(sortedChatRooms[0])
            }
          }
        }
      } catch (e) {
        console.log("Error with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
      }
    }
    if (mongodb && credentials != "invalid") {
      chatRoomFetch()
    }
  }, [credentials])

  useEffect(() => {

    const messagesFetch = async () => {
      try {
        const messagesResponse = await axios.get(`/message/getFromChatRoom/${currentChatRoom._id}`)
        setMessages(() => [...messagesResponse.data])
      } catch (e) {
        console.log("ERROR with Axios")
        console.log(e.response.data)
        console.log(e.response.status)
      }
    }
    if (currentChatRoom._id) {
      messagesFetch()
    }
  }, [currentChatRoom._id])

  const updateChatRoom = (id) => {
    return () => {
      setCurrentChatRoom(id)
    }
  }

  const addMessage = (message) => {
    if(message.chatRoom.toString() === currentChatRoom._id.toString()) {
      message.timeSent = message.timeSent.toString()
      setMessages((messages) => [...messages, message])
    }
  }

  useEffect(() => {
    const monitorChatRooms = async () => {
      if (mongodb && !chatRoomMonitoring.content) {
        chatRoomMonitoring.content = true
        const chatRoomsCollection = mongodb.db("test").collection("chatrooms")
        for await (const change of chatRoomsCollection.watch()) {
          if(change.ns.coll === "chatrooms") {
            console.log("CHANGEEE")
            console.log(change)
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
    if (credentials != "invalid") {
      monitorChatRooms()
    }
  }, [credentials])

  useEffect(() => {
    let watch = true
    const monitorMessages = async () => {
      if (mongodb) {
        const messagesCollection = mongodb.db("test").collection("messages")
        for await (const change of messagesCollection.watch()) {
          if (watch) {
            if (change.ns.coll === "messages") {
              if (change.operationType === "insert") {
                addMessage(change.fullDocument)
              } else {
                break
              }
            }
          }
        }
      }
    }
    monitorMessages()
    return () => {
      watch = false
    }

  }, [currentChatRoom._id])

  if (credentials != "invalid" && mongodb) {
    return (
      <MongodbContext.Provider value={mongodb}>
      <CredentialsContext.Provider value={credentials}>
        <div className="App-container">
          <Conversations chatRooms={chatRooms} updateChatRoom={updateChatRoom} currentChatRoom={currentChatRoom}></Conversations>
          {chatRooms && <Chat messages={messages} currentChatRoom={currentChatRoom}></Chat>}
        </div>
      </CredentialsContext.Provider>
      </MongodbContext.Provider>
      
    )
  } else if (mongodb) {
    return (
        <MongodbContext.Provider value={mongodb}>
        <CredentialsContext.Provider value={credentials}>
          <div className="App-container-Login">
            {!isLoggedIn && <Login mongodb={mongodb} appSetCredentials={appSetCredentials}></Login>}
          </div>
        </CredentialsContext.Provider>
        </MongodbContext.Provider>
    );
  }
  return (
    <h1 style={{color: "white"}}>CONNECTING</h1>
  )
}

export default App;
