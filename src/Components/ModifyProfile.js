import { useState } from 'react'

import "../css/ModifyProfile.css"

// component import
import FileUpload from './FileUpload'

const ModifyProfile = ({ type, modifyProfileRef }) => {
    if (type === "chat") {
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
                        type="text"></input>
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
    if (type === "account") {
        return (
            <div className="ModifyProfile-outer">
                <div
                ref={modifyProfileRef}
                className="ModifyProfile">
                    <h1>Modify Account</h1>
                    <form>
                        <label>Chat Name</label>
                        <input
                        placeholder="Enter Chat Name"
                        type="text"></input>
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