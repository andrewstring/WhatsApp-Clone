export const getDate = (dateProp) => {
    const today = new Date()
    const date = new Date(dateProp)
    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
        return "Today"
    }
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
}

export const getTime = (dateProp) => {
    const today = new Date()
    const date = new Date(dateProp)
    let dateHolder = ""
    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
        dateHolder = "Today"
    }
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const year = date.getFullYear()
    dateHolder = `${month}/${day}/${year}`
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    const ampm = hours > 12 ? "AM" : "PM"
    hours = hours > 9 ? hours : `0${hours}`
    let minutes = date.getMinutes()
    minutes = minutes > 9 ? minutes : `0${minutes}`
    let seconds = date.getSeconds()
    seconds = seconds > 9 ? seconds : `0${seconds}`
    const time = `${hours}:${minutes}:${seconds} ${ampm}`

    return `${dateHolder} at ${time}`

}