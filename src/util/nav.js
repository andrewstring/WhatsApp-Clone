export const handleClickOutsideRef = (ref, e, handler) => {
    if (ref.current && !ref.current.contains(e.target)) {
        handler()
    }
}