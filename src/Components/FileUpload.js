import { useState } from 'react'

import "../css/FileUpload.css"

const FileUpload = ({value}) => {
    return (
        <div className="FileUpload">
            <input
            placeholder={value} 
            type="file"></input>
        </div>
    )
}


export default FileUpload