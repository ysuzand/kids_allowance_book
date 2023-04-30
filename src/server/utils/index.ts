import db from '../db'

const checkSavingMonthExist = (uid: number, yearmonth: string) => {
    let isNewRecord = true
    let existingRecord = null
    const getSavingSql = `
        SELECT *
        FROM expense_details
        WHERE uid = ? AND yearmonth = ?
    `
    const getSavingParams = [uid, yearmonth]
    db.get(getSavingSql, getSavingParams, (err, row) => {
        if (err) {
            isNewRecord = false
        } else {
            existingRecord = row
        }
    })
    return { isNewRecord, existingRecord }
}

// Loop form values object to find any of user filled field.
const checkFieldFulfilled = <T extends {[key: string]: string |number}>(fieldsToCheck: T): boolean => !!Object.entries(fieldsToCheck).find(nested => !!nested[1])

export {
    checkSavingMonthExist,
    checkFieldFulfilled
}