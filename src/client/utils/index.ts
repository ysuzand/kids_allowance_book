export const Wait = (timeout: number = 1000) => {
    return new Promise(resolve => setTimeout(() => {}, timeout))
}
