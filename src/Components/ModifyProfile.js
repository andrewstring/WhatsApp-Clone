import { useState } from 'react'

import "../css/ModifyProfile.css"

const ModifyProfile = ({ type, modifyProfileRef }) => {
    return (
        <div className="ModifyProfile-outer">
            <div
            ref={modifyProfileRef}
            className="ModifyProfile">
                <h1>CHange PRofile</h1>
            </div>
        </div>
    )
}


export default ModifyProfile