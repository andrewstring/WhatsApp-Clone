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
    const [ file, setFile ] = useState()
    const [ members, setMembers ] = useState([])

    // helper functions
    const handleSetFile = (newFile) => {
        setFile(newFile)
    }
    const getAccountsByIds = async (ids) => {
        return Promise.all(ids.map(async (id) => {
            return (await axios.post("/account/get", { id: id })).data.account
        }))
    }
    const handleSubmit = async (e, type) => {
        e.preventDefault()
        const form = new FormData()
        switch(type) {
            case "chat": {
                form.append("id", profile._id)
                form.append("name", profileInput.name)
                form.append("picture", file)
                const result = await axios.put("/chatroom/update/", form)
                console.log("CHATA")
                console.log(result)
                return 
            }
            case "account": {

                return 
            }
            return
        }
    }
    const handleChange = (e, field) => {
        e.preventDefault()
        switch (field) {
            case "name": {
                setProfileInput((profileInput) => {
                    return {
                        ...profileInput,
                        name: e.target.value
                    }
                })
                return
            }
        }
    }

    // useEffects
    useEffect(() => {
        if (profileInput.members) {
            try {
                getAccountsByIds(profileInput.members)
                .then((result) => setMembers(result))
                .catch((e) => console.log(e))
            } catch (e) {
                console.log(e)
            }
        }
    }, [profileInput])

    if (type === "chat") {
        
        return (
            <div className="ModifyProfile-outer">
                <div
                ref={modifyProfileRef}
                className="ModifyProfile scrollbar-hidden">
                    <h1>Modify Chat</h1>
                    <form
                    onSubmit={(e) => handleSubmit(e, "chat")}
                    >
                        <label>Chat Name</label>
                        <input
                        placeholder="Enter Chat Name"
                        value={profileInput.name}
                        onChange={(e) => handleChange(e,"name")}
                        type="text"></input>
                        <label>Chat Picture</label>
                        <FileUpload
                        maxSize={15e6}
                        file={file}
                        handleSetFile={handleSetFile}
                        type="picture"
                        value="Picture"></FileUpload>
                        <label>Members</label>
                        {members.map(member => (
                        <div className="ModifyProfile-member">
                            <p>{member.username}</p>
                            <button className="ModifyProfile-member-remove">X</button>
                        </div>
                        ))}
                        <input type="submit"></input>

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
                className="ModifyProfile scrollbar-hidden">
                    <h1>Modify Account</h1>
                    <form
                    onSubmit={(e) => handleSubmit(e, "account")}
                    >
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
                        maxSize={15e6}
                        file={file}
                        handleSetFile={handleSetFile}
                        type="picture"
                        value="Picture"></FileUpload>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}


export default ModifyProfile