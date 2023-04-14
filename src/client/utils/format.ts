export const getFormValueObject = (formTarget: HTMLFormElement) => {
    const formData = new FormData(formTarget as HTMLFormElement)
    let returnData = <FormValue>{}

    for(const [key, value] of formData) {
        returnData = {
            ...returnData,
        [key]: value
        }
    }
    
    return { formValue: returnData }
}

export const extractKeysFromData = <T extends object>(data: T, removeKeys: string[]): T => {
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

type FormatValuesForSchema = (formValues: FormValue) => ReturnFormValue;

export const formatFormValuesForSchema: FormatValuesForSchema = formValues => {
    const yearmonth = `${formValues.year}-${formValues.month}`
    return {...getObject<FormValue>(formValues), yearmonth}

    //     for(const [key, value] of Object.entries(formValues)) {
    //         returnFormValues = {
    //             ...returnFormValues,
    //             [key]: value
    //         }
    //     }

    // return returnFormValues as R
}

const getObject = <R extends object>(originalObject: R): R=> {
    let returnObject = <R>{}
    for(const [key, value] of Object.entries(originalObject)) {
        returnObject = {
            ...returnObject,
            [key]: value
        }
    }

    return returnObject
}