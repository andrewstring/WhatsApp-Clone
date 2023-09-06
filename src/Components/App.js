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

  const getChatRoomMessages = (roomId) => {
    return async (roomId) => {
      const messagesResponse = await axios({
        method: "get",
        url: "/message/getFromChatRoom",
        data: {
          _id: "64f8b56542369a47d2475e92"
        }
      })
      setMessages(messages => [...messages,...messagesResponse])
    }
  }

  const [ messages, setMessages ] = useState([])
  const [ mongoUser, setMongoUser ] = useState()
  const [ mongoRealtime, setMongoRealtime ] = useState()

  useEffect(() => {
    const login = async () => {
      const realmUser = await realmApp.logIn(Realm.Credentials.anonymous())
      setMongoUser(realmUser)
      const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas")
      setMongoRealtime(mongodb)
    }
    login()
  }, [])

  return (
      <div className="App-container">
        {mongoRealtime && <Conversations mongo={mongoRealtime} getChatRoomMessages={getChatRoomMessages}></Conversations>}
        {mongoRealtime && <Chat mongo={mongoRealtime}messages={messages}></Chat>}
      </div>
  );
}

export default App;
