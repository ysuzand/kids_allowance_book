export const Wait = (cb: () => void, timeout: number = 200) => {
    setTimeout(cb, timeout)   
}

