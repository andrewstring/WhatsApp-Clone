// react import
import { useState } from 'react'

// css import
import "../css/Options.css"


const Options = ({side, handleExit}) => {
    // css positioning determination
    const loc = side === "left" ? "Options-left" : "Options-right"

    // rendering
    return (
        <div className={`Options ${loc}`}>
            <h1 onClick={handleExit}>l</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
            <h1>OPTIONS</h1>
        </div>
    )
}

export default Options