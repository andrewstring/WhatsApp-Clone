import { useState } from 'react'

import "../css/Options.css"


const Options = ({side, handleExit}) => {
    const loc = side === "left" ? "Options-left" : "Options-right"
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