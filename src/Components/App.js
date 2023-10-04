// react import
import { useState, useEffect, useRef } from "react"

// css import
import '../css/App.css';

// components import
import Login from './Login';
import Conversations from './Conversations';
import Chat from "./Chat";
import ModifyProfile from './ModifyProfile'
import Modal from "./Modal";
import AttachmentModal from "./AttachmentModal";

// helper function import
import { handleClickOutsideRef } from "../util/nav";

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext';
import { MongodbContext } from '../Contexts/MongodbContext';

// library import
import * as Realm from "realm-web";
import axios from 'axios';
import { Sync } from "@mui/icons-material";

// library setup
const realmApp = new Realm.App({ id: "whatsapp-clone-nrzrz"})
axios.defaults.baseURL = "http://localhost:3005"
// axios.defaults.baseURL = "https://whatsapp-clone-backend-608e90b922c2.herokuapp.com"

function App() {

  // state variable initialization
  const [ credentials, setCredentials ] = useState("invalid")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ chatRooms, setChatRooms] = useState([])
  const [ currentChatRoom, setCurrentChatRoom ] = useState("")
  const [ messages, setMessages ] = useState([])
  const [ mongodb, setMongodb ] = useState()
  const [ conversationsExpanded, setConversationsExpanded ] = useState(false)
  const [ modifyChatProfile, setModifyChatProfile ] = useState(false)
  const [ modifyAccount, setModifyAccount ] = useState(false)
  const [ addingChat, setAddingChat ] = useState(false)
  const [ attachmentModal, setAttachmentModal ] = useState(false)
  const [ attachment, setAttachment ] = useState(null)

  // ref initialization
  const chatRoomMonitoring = useRef(false)
  const addChatModalRef = useRef(null)
  const modifyChatProfileRef = useRef(null)
  const modifyAccountRef = useRef(null)
  const attachmentModalRef = useRef(null)

  // prop/helper functions
  const handleModifyChatProfile = () => {
      setModifyChatProfile(((modifyChatProfile) => !modifyChatProfile))
  }
  const handleModifyAccount = () => {
    setModifyAccount(((modifyAccount) => !modifyAccount))
  }
  const handleConversationsExpand = () => {
    console.log("EXPAND")
    setConversationsExpanded((conversationsExpanded) => !conversationsExpanded)
  }
  const handleAttachmentModal = () => {
    setAttachmentModal((attachmentModal) => !attachmentModal)
  }
  const handleAttachment = (attachment) => {
    setAttachment(attachment)
  }
  const handleClearAttachment = (e) => {
    if (e) {
      e.preventDefault()
    }
    setAttachment(null)
  }
  const appSetCredentials = (cred) => {
    setCredentials(cred)
  }
  const updateChatRoom = (id) => {
    return () => {
      handleClearAttachment()
      setCurrentChatRoom(id)
    }
  }
  const handleAddChat = () => {
    setAddingChat((addingChat) => !addingChat)
  }
  const addMessage = (message) => {
    if(message.chatRoom.toString() === currentChatRoom._id.toString()) {
      message.timeSent = message.timeSent.toString()
      setMessages((messages) => [...messages, message])
    }
  }
  const handleClickOutsideAddChatModal = (e) => {
      handleClickOutsideRef(addChatModalRef, e, () => {
          handleAddChat()
      })
  }
  const handleClickOutsideModifyChatProfile = (e) => {
    handleClickOutsideRef(modifyChatProfileRef, e, () => {
      handleModifyChatProfile()
    })
  }
  const handleClickOutsideModifyAccount = (e) => {
    handleClickOutsideRef(modifyAccountRef, e, () => {
      handleModifyAccount()
    })
  }
  const handleClickOutsideAttachmentModal = (e) => {
    handleClickOutsideRef(attachmentModalRef, e, () => {
      handleAttachmentModal()
    })
  }

  // useEffects
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
    document.addEventListener("mousedown", handleClickOutsideAddChatModal)
    document.addEventListener("mousedown", handleClickOutsideModifyChatProfile)
    document.addEventListener("mousedown", handleClickOutsideModifyAccount)
    document.addEventListener("mousedown", handleClickOutsideAttachmentModal)

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAddChatModal)
      document.removeEventListener("mousedown", handleClickOutsideModifyChatProfile)
      document.removeEventListener("mousedown", handleClickOutsideModifyAccount)
      document.removeEventListener("mousedown", handleClickOutsideAttachmentModal)
    }
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



  useEffect(() => {
    const monitorChatRooms = async () => {
      if (mongodb && !chatRoomMonitoring.content) {
        chatRoomMonitoring.content = true
        const chatRoomsCollection = mongodb.db("test").collection("chatrooms")
        for await (const change of chatRoomsCollection.watch()) {
          if(change.ns.coll === "chatrooms") {
            console.log("CHANGEEE")
            console.log(change)
            if (change.operationType === "insert") {
              if (!currentChatRoom) {
                setCurrentChatRoom(change.fullDocument)
              }
              setChatRooms((chatRooms) => [change.fullDocument, ...chatRooms])
            } else if (change.operationType === "update") {
              (change.fullDocument.members.forEach((member) => {
                if (member.toString() === credentials._id) {
                  setChatRooms((chatRooms) => {
                    const newChatRooms = chatRooms.filter((chatRoom) => {
                      return change.fullDocument._id.toString() !== chatRoom._id.toString()
                    })
                    return [change.fullDocument, ...newChatRooms]
                  })
                }
              }))
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


  
  // DEBUG
  console.log("ATTACHMENT")
  console.log(attachment)


  // rendering
  if (credentials != "invalid" && mongodb) {
    return (
      
      <MongodbContext.Provider value={mongodb}>
      <CredentialsContext.Provider value={credentials}>
        {modifyChatProfile && <ModifyProfile
        type="chat"
        profile={currentChatRoom}
        modifyProfileRef={modifyChatProfileRef}
        ></ModifyProfile>}
        {modifyAccount && <ModifyProfile 
        type="account"
        profile={credentials}
        modifyProfileRef={modifyAccountRef}></ModifyProfile>}
        {addingChat && <Modal
        modalRef={addChatModalRef}
        type="addChat"
        handleAddChat={handleAddChat}></Modal>}
        {attachmentModal && <AttachmentModal
        attachmentModalRef={attachmentModalRef}
        attachment={attachment}
        handleAttachment={handleAttachment}
        handleAttachmentModal={handleAttachmentModal}
        ></AttachmentModal>}
        <div className="App-container">
          <Conversations chatRooms={chatRooms}
          handleAddChat={handleAddChat}
          updateChatRoom={updateChatRoom}
          currentChatRoom={currentChatRoom}
          expanded={conversationsExpanded}
          handleConversationsExpand={handleConversationsExpand}
          handleModifyAccount={handleModifyAccount}></Conversations>
          {chatRooms && <Chat
          attachment={attachment}
          handleClearAttachment={handleClearAttachment}
          messages={messages}
          currentChatRoom={currentChatRoom}
          handleConversationsExpand={handleConversationsExpand}
          handleModifyChatProfile={handleModifyChatProfile}
          handleAttachmentModal={handleAttachmentModal}
          ></Chat>}
          
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
    <div className="loading">
      <h1>CONNECTING</h1>
      <Sync className="Sync spin"></Sync>

    </div>
    
  )
}

export default App;
