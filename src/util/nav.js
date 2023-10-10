export const handleClickOutsideRef = (ref, e, handler) => {
    if (ref.current && !ref.current.contains(e.target)) {
        handler()
    }
    console.log("keydown")
    console.log(e.key)
    if (e.key === "Escape") {
        handler()
    }
}