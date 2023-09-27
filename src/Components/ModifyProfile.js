import { useState } from 'react'

import "../css/ModifyProfile.css"

// component import
import FileUpload from './FileUpload'

const ModifyProfile = ({ type, profile, modifyProfileRef }) => {
    const [ profileInput, setProfileInput ] = useState(profile)

    if (type === "chat") {
        console.log("PROFILE")
        console.log(profile)
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
                        {profileInput.members.map(member => {
                            return <p>{member}</p>
                        })}

                    </form>
                </div>
            </div>
        )
    }
    if (type === "account") {
        console.log("PROFILE")
        console.log(profile)
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
                        <label>Chat Picture</label>
                        <FileUpload
                        type="picture"
                        value="Picture"></FileUpload>
                        <label>Members</label>
                    </form>
                </div>
            </div>
        )
    }
}


export default ModifyProfile