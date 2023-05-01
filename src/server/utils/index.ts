// Loop form values object to find any of user filled field.
const checkFieldFulfilled = <T extends {[key: string]: string|number}>(fieldsToCheck: T): boolean => !!Object.entries(fieldsToCheck).find(nested => !!nested[1])

export {
    checkFieldFulfilled
}