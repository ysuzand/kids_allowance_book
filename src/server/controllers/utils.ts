import db from '../db/'

const checkSavingMonthExist = (uid: number, year: string, month: string) => {
    let isNewRow = true
    let row = null
    const getSavingSql = `
        SELECT *
        FROM saving_detail
        WHERE uid = ?
        AND year = ?
        AND month = ?`
    const getSavingParams = [uid, year, month]
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