import db from '../db'

const checkSavingMonthExist = (uid: number, yearmonth: string) => {
    let isNewRow = true
    let row = null
    const getSavingSql = `
        SELECT *
        FROM expense_details
        WHERE uid = ?
        AND year = ?
        AND month = ?`
    const getSavingParams = [uid, yearmonth]
    db.get(getSavingSql, getSavingParams, (err, row) => {
        if (err) {
            isNewRow = false
        } else {
            row = row
        }
    })
    return { isNewRow, row }
}

// Loop form values object to find any of user filled field.
const checkFieldFulfilled = <T extends {[key: string]: string |number}>(fieldsToCheck: T): boolean => !!Object.entries(fieldsToCheck).find(nested => !!nested[1])

export {
    checkSavingMonthExist,
    checkFieldFulfilled
}