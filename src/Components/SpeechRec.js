import { useState, useEffect } from 'react'

// speech recognition import
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const SpeechRec = (props) => {
    // const [ connection, setConnection ] = useState(null)

    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition()

    // const getMicAccess = async () => {
    //     try {
    //         await navigator.mediaDevices.getUserMedia({ audio: true })
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(async () => {
    //     if (browserSupportsSpeechRecognition) {
    //         if (!isMicrophoneAvailable) {
    //             await getMicAccess()
    //         }
    //         if (isMicrophoneAvailable) {
    //             setConnection(
    //                 <div className="SpeechRec">
    //                     <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start dictation</button>
    //                     <h1>{transcript}</h1>
    //                 </div>
    //             )
    //             return
    //         }
    //     }
    //     setConnection(
    //         <div className="SpeechRec">
    //             <h1>Browser does not support speech recognition. Try using Google Chrome</h1>
    //         </div>
    //     )
    // }, [])

    return (
        // { connection }
        <h1>Will Implement</h1>
    )


}


export default SpeechRec