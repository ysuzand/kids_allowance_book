export const getFormValueObject = (formTarget: HTMLFormElement) => {
    const formData = new FormData(formTarget as HTMLFormElement)
    // const formValue = Object.fromEntries(formData.entries()) // This method does not work well with TS.
    let returnData = {}
    for(const [key, value] of formData) {
        returnData = {
            ...returnData,
        [key]: value
        }
    }
    
    return { formValue: returnData }
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

export const formatFormValuesForSchema = <R>(formValues:FormValue): R => {
    const yearmonth = `${formValues.year}-${formValues.month}`
    let returnFormValues = {yearmonth}
        for(const [key, value] of Object.entries(formValues)) {
            returnFormValues = {
                ...returnFormValues,
                [key]: value
            }
        }

    return returnFormValues as R
}