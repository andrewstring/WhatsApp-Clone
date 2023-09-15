import { useState, useContext } from 'react'

import { CredentialsContext } from '../Contexts/CredentialsContext'

import "../css/Modal.css"

// Axios import
import axios from "axios"
import { MongodbContext } from '../Contexts/MongodbContext'

// Axios setup
axios.defaults.baseURL = "http://localhost:3005"


const Modal = ({type, handleAddChat}) => {
    // State initialization
    const [ inputOne, setInputOne ] = useState("")
    const [ error, setError ] = useState(false)

    // Add Members state initialization
    const [ memberQuery, setMemberQuery ] = useState([])
    const [ memberInput, setMemberInput ] = useState("")
    const [ members, setMembers ] = useState([])

    // Context initialization
    const credentials = useContext(CredentialsContext)
    const mongodb = useContext(MongodbContext)
    console.log(credentials)

    const accountsCollection = mongodb.db("test").collection("accounts")

    const handleMemberQuery = async (e) => {
        setMemberInput(e.target.value)
        let accounts = []
        if (e.target.value) {
            accounts = await accountsCollection.find({
                "username": { $regex: e.target.value, $options: 'i'}
            })
            accounts = accounts.filter(account => account._id.toString() != credentials._id)
        }
        console.log("ACCOUNTS")
        console.log(accounts)
        console.log(e.target.value)
        setMemberQuery(accounts)
    }

    const handleAddMember = (member) => {
        //CAUSING INFINITE LOOP...LOOK INTO
        // setMembers((members) => [member.usename, ...members])
        console.log(member)
    }

    const handleChange = (inputType, e) => {
        if (inputType === "addChat") {
            setInputOne(e.target.value)
        }
    }
    const handleSubmit = async (inputType, e) => {
        e.preventDefault()
        console.log(e.nativeEvent.submitter.id)
        if (inputType === "addChat") {
            try {
                await axios.post("/chatroom/new", {
                    name: inputOne,
                    id: credentials._id
                })
                setError(false)
                setInputOne("")
                handleAddChat()
            } catch (e) {
                setError(true)
            }
        }
    }

    if (type === "addChat") {
        return (
            <div className="Modal Modal-addChat">
                <div>
                    <h3>MEMBERS ADDED TO CHAT:</h3>
                    {members.length ?
                    members.map((member) => {
                        <p>member.username</p>
                    })
                    : <p>None yet</p>}
                    <br></br>
                    <form onSubmit={(e) => handleSubmit(type,e)}>
                        <label>Enter Chat Name</label>
                        <input
                        placeholder="Chat Name"
                        value={inputOne}
                        onChange={(e) => handleChange(type,e)}
                        ></input>
                        <input
                        id="addChat"
                        type="submit"
                        ></input>
                        <input
                        id="moveAddMembers"
                        type="submit"
                        ></input>
                        {error && <p>chatRoomAlreadyExists</p>}
                    </form>

                </div>

                <div>
                    <h3>ADD MEMBERS TO CHAT</h3>
                    <form onSubmit={(e) => handleSubmit(type,e)}>
                        <label>Enter Username</label>
                        <input
                        onChange={handleMemberQuery}
                        placeholder="Username"
                        ></input>
                        <div className="Modal-member-query">
                            {memberQuery.length ? memberQuery.map(member => 
                                <button onClick={handleAddMember(member)}>{member.username}</button>)
                            : <p></p>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}


export default Modal