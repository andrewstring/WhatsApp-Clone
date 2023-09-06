import '../css/App.css';
import { useState, useEffect } from "react"

import Conversations from './Conversations';
import Chat from "./Chat";
import * as Realm from "realm-web";

const realmApp = new Realm.App({ id: "whatsapp-clone-nrzrz"})

function App() {

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
        {mongoRealtime && <Conversations mongo={mongoRealtime}></Conversations>}
        {mongoRealtime && <Chat mongo={mongoRealtime}></Chat>}
      </div>
  );
}

export default App;
