import { useState } from 'react'

import "../css/ModifyProfile.css"

// component import
import FileUpload from './FileUpload'

// library import
import axios from "axios"

// library setup
axios.defaults.baseURL = "http://localhost:3005"

const ModifyProfile = ({ type, profile, modifyProfileRef }) => {
    const [ profileInput, setProfileInput ] = useState(profile)
    const [ members, setMembers ] = useState([])

    useEffect(() => {
        if(profileInput.members) {
            setMembers([
                ...()
            ])
        }
    }, [])

    if (type === "chat") {
        const getAccountById = async (id) => {
            try {
                const account = await axios.post("/account/get", {
                    id: id
                })
                console.log("ACCOUNT")
                console.log(account)
                return account
            } catch (e) {
                console.log(e)
            }
        }
        return (
            <div className="ModifyProfile-outer">
                <div
                ref={modifyProfileRef}
                className="ModifyProfile">
                    <h1>Modify Chat</h1>
                    <form>
                        <label>Chat Name</label>
                        <input
                        placeholder="Enter Chat Name"
                        value={profileInput.name}
                        type="text"></input>
                        <label>Chat Picture</label>
                        <FileUpload 
                        type="picture"
                        value="Picture"></FileUpload>
                        <label>Members</label>
                        {profileInput.members.map(async member => {
                            const account = await getAccountById(member)
                            console.log("ACCOUNTT")
                            console.log(account.data.account.username)
                            return <p>{account.data.account.username}</p>
                        })}

                    </form>
                </div>
            </div>
        )
    }
    if (type === "account") {
        return (
            <div className="ModifyProfile-outer">
                <div
                ref={modifyProfileRef}
                className="ModifyProfile">
                    <h1>Modify Account</h1>
                    <form>
                        <label>Modify First Name</label>
                        <input
                        placeholder="Enter First Name"
                        value={profileInput.firstName}
                        type="text"></input>
                        <label>Modify Email</label>
                        <input
                        placeholder="Modify Email"
                        value={profileInput.email}
                        type="text"
                        ></input>
                        <label>Modify Username</label>
                        <input
                        placeholder="Enter Username"
                        value={profileInput.username}
                        type="text"></input>
                        <label>Modify Password</label>
                        <input
                        placeholder="Modify Password"
                        value={profileInput.password}
                        type="password"></input>
                        <label>Profile Picture</label>
                        <FileUpload
                        type="picture"
                        value="Picture"></FileUpload>
                    </form>
                </div>
            </div>
        )
    }
}


export default ModifyProfile