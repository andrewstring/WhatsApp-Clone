// react import
import { useState, useContext } from 'react'

// css import
import "../css/Modal.css"

// context import
import { CredentialsContext } from '../Contexts/CredentialsContext'
import { MongodbContext } from '../Contexts/MongodbContext'

// library import
import axios from "axios"

// library setup
axios.defaults.baseURL = "http://localhost:3005"


const Modal = ({type, handleAddChat}) => {

    // state initialization
    const [ inputOne, setInputOne ] = useState("")
    const [ error, setError ] = useState(false)
    const [ memberQuery, setMemberQuery ] = useState([])
    const [ memberInput, setMemberInput ] = useState("")
    const [ members, setMembers ] = useState([])

    // context initialization
    const credentials = useContext(CredentialsContext)
    const mongodb = useContext(MongodbContext)

    // collection initialization
    const accountsCollection = mongodb.db("test").collection("accounts")

    // prop/helper functions
    const handleMemberQuery = async (e) => {
        setMemberInput(e.target.value)
        let accounts = []
        if (e.target.value) {
            // add escaped values to handle errors in regex parsing
            const escapedInput = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`\\b${escapedInput}\\w*\\b`, 'i');
            accounts = await accountsCollection.find({
                "username": pattern
            })
            accounts = accounts.filter(account => account._id.toString() != credentials._id)
        }
        setMemberQuery(accounts)
    }
    const handleAddMember = (e,member) => {
        e.preventDefault()
        setMembers((members) => {
            if (!members.includes(member)) {
                return [member, ...members]
            }
            return [...members]
        })
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
                    id: credentials._id,
                    members: members.map(member => member._id)
                })
                setError(false)
                setInputOne("")
                handleAddChat()
            } catch (e) {
                console.log(e.response.data)
                setError("Chat room already existsll")
            }
        }
    }
    const handleExit = () => handleAddChat()

    // rendering
    if (type === "addChat") {
        return (
            <div className="Modal Modal-addChat">
                <div>
                    <h3>MEMBERS ADDED TO CHAT:</h3>
                    {members.length ?
                    members.map((member) => {
                        return <p>{member.username}</p>
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
                        {error && <p>{error}</p>}
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
                                <button onClick={(e) => handleAddMember(e,member)}>{member.username}</button>)
                            : <p></p>}
                        </div>
                    </form>
                </div>
                <a onClick={handleExit}>X</a>
            </div>
        )
    }
}


export default Modal