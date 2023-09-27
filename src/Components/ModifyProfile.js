import { useState, useEffect } from 'react'

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

    // helper functions
    const getAccountById = async (id) => {
        try {
            const account = (await axios.post("/account/get", {
                id: id
            })).data.account
            console.log("ACCOUNT RETRIEVAL")
            console.log(account)
            return account
        } catch (e) {
            console.log(e)
        }
    }

    // useEffects
    useEffect(() => {
        if(profileInput.members) {
            setMembers([
                ...(profileInput.members.map(async member => {
                    return await getAccountById(member)
                }))
            ])
        }
    }, [])

    if (type === "chat") {
        console.log("MEMBERS")
        console.log(members)
        
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
                        {members.length && members.map(member => {
                            return <p>{member.username}</p>
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