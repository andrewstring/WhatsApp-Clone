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
const getItems = (items) => {
    console.log("ITEMS")
    console.log(items)
    if (items) {
        return items.map((item) => {
            return <h1 onClick={item[1]}>{item[0]}</h1>
        })
    }
    return null
}

const Popup = ({ type, side, handleExit, PopupRef, items }) => {
    // css positioning determination
    const loc = getLoc(side)
    const itemElems = getItems(items)

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
            <h1 className="Popup-exit" onClick={handleExit}>X</h1>
            {itemElems}
        </div>
    )
}

export default Popup