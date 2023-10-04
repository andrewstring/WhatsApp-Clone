import "../css/AttachmentModal.css"

// component imports
import FileUpload from "./FileUpload"

const AttachmentModal = ({attachmentModalModalRef, attachment, handleAttachment}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="AttachmentModal-outer">
            <div
            ref={attachmentModalModalRef}
            className="AttachmentModal scrollbar-hidden">
                <h1>Add Attachment</h1>
                <p>Accepted file types currently: JPEG</p>
                <label>Attachment Upload</label>
                <form onSubmit={handleSubmit}>
                    <FileUpload
                    maxSize={15e6}
                    file={attachment}
                    handleSetFile={handleAttachment}
                    type="picture"
                    value="picture"
                    ></FileUpload>
                </form>
            </div>
        </div>
    )
}

export default AttachmentModal