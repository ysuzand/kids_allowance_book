export const Wait = (resolve: () => void, timeout: number = 200) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

