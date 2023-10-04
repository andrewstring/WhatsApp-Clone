import "../css/AttachmentModal.css"

// component imports
import FileUpload from "./FileUpload"

const AttachmentModal = ({attachmentModalRef, attachment, handleAttachment, handleAttachmentModal}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = () => {
        handleAttachmentModal()
    }

    return (
        <div className="AttachmentModal-outer">
            <div
            ref={attachmentModalRef}
            className="AttachmentModal scrollbar-hidden">
                <h1>Add Attachment</h1>
                <p>Accepted file types currently: JPEG</p>
                <form onSubmit={handleSubmit}>
                    <FileUpload
                    maxSize={15e6}
                    file={attachment}
                    handleSetFile={handleAttachment}
                    handleChange={handleChange}
                    type="picture"
                    value="picture"
                    ></FileUpload>
                </form>
            </div>
        </div>
    )
}

export default AttachmentModal