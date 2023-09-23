// react import
import { useState } from 'react'

// emoji import
import EmojiPicker from 'emoji-picker-react'

// css import
import "../css/Popup.css"

// helper functions
const getLoc = (side) => {
    switch(side) {
        case "top-left": {
            return "Popup-top-left"
        }
        case "top-right": {
            return "Popup-top-right"
        }
        case "bottom-left": {
            return "Popup-bottom-left"
        }
        case "bottom-right": {
            return "Popup-bottom-right"
        }
        default: {
            return ""
        }
    }
}

const Popup = ({ type, side, handleExit, PopupRef }) => {
    // css positioning determination
    const loc = getLoc(side)

    // rendering
    if (type === "emoji") {
        return (
            <div className={`Popup ${loc}`} ref={PopupRef}>
                <EmojiPicker></EmojiPicker>
            </div>
        )
    }
    return (
        <div className={`Popup ${loc}`} ref={PopupRef}>
            <h1 onClick={handleExit}>l</h1>
            <h1>Popup</h1>
            <h1>Popup</h1>
            <h1>Popup</h1>
            <h1>Popup</h1>
        </div>
    )
}

export default Popup