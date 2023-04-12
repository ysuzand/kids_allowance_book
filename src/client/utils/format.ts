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

export const formatFormValues = <R>(formValues:{ [key: string]: FormDataEntryValue }, type: 'expense'|'income'): R => {
    const yearmonth = `${formValues.year}-${formValues.month}`
    const values = type === 'expense'
    ? {
        food: formValues.food,
        fashion: formValues.fasion,
        school: formValues.school,
        hobby: formValues.hobby,
        yearmonth
    }
    : {
        income: formValues.income,
        yearmonth
    }

    return values as R
}