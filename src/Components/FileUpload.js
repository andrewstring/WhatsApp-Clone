import { useState, useEffect } from 'react'

import "../css/FileUpload.css"

const FileUpload = ({type, value, file, handleSetFile}) => {

    const [ acceptedFileTypes, setAcceptedFileTypes ] = useState([])
    const [ acceptedMime, setAcceptedMime ] = useState("")
    const [ fileTypeLabel, setFileTypeLabel ] = useState("")

    const accept = (type) => {
        switch(type) {
            case "picture": {
                setAcceptedFileTypes([
                    "image/png",
                    "image/jpeg"
                ])
                setFileTypeLabel("Accepted file types: PNG, JPEG")
                setAcceptedMime("/image/*")
                return
            }
            default: return
        }
    }

    useEffect(() => {
        accept(type)
    }, [])

    const handleFile = (e) => {
        e.preventDefault()
        if (e.target.files[0] && acceptedFileTypes.includes(e.target.files[0].type)) {
            handleSetFile(e.target.files[0])
            
        } else {
            alert("File type not accepted")
        }
    }

    return (
        <div className="FileUpload">
            <label for="fileUpload">
                <input
                id="fileUpload"
                placeholder={value} 
                accept={acceptedMime}
                onChange={handleFile}
                type="file"></input>
                {fileTypeLabel}
            </label>
            {file && <img className="FileUpload-image" src={URL.createObjectURL(file)}></img>}
        </div>
    )
}


export default FileUpload