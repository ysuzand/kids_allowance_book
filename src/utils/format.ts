export const getFormValueObject = (formTarget: HTMLFormElement) => {
    const formData = new FormData(formTarget as HTMLFormElement)
    const formValue = Object.fromEntries(formData.entries())

    return { formValue }
}

export const exploitKeysFromData = <T extends object>(data: T, removeKeys: string[]): T => {
    let updatedFormValues = {}
   
    for (const [key, value] of Object.entries(data)) {
        if (!removeKeys.includes(key)) {
            updatedFormValues = {
                ...updatedFormValues,
                [key]: value
            }
        }
    }

    return updatedFormValues as T
}