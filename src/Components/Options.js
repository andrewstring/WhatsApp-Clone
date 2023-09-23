// react import
import { useState } from 'react'

// css import
import "../css/Options.css"

// helper functions
const getLoc = (side) => {
    switch(side) {
        case "top-left": {
            return "Options-top-left"
        }
        case "top-right": {
            return "Options-top-right"
        }
        case "bottom-left": {
            return "Options-bottom-left"
        }
        case "bottom-right": {
            return "Options-bottom-right"
        }
        default: {
            return ""
        }
    }
}

const Options = ({side, handleExit, optionsRef}) => {
    // css positioning determination
    const loc = getLoc(side)

    // rendering
    return (
        <div className={`Options ${loc}`} ref={optionsRef}>
            <h1 onClick={handleExit}>l</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
        </div>
    )
}

export default Options