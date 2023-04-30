import type { Request, Response } from 'express'
import type { RunResult } from 'sqlite3'
import db from '../db'

import {
    checkSavingMonthExist,
    checkFieldFulfilled
} from '../utils'

export const getTotal = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM savings WHERE uid = ?'
    const params = [+req.params.uid]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                success: false
            })
            return
        }

        res.status(200).json({
            success: true,
            data: row
        })
    })
}

export const addIncome = (req: Request, res: Response) => {
    const { uid, yearmonth, year, month, income, memo } = req.body
    if (!income) {
        res.status(400).json({
            success: false,
            message: 'No input data to save.'
        })
        return
    }
    // Check if the user already added income in the same year-month
    const {isNewRecord, existingRecord} = checkSavingMonthExist(+uid, yearmonth)
    const params = [+uid, yearmonth, year, month, +income, memo]
    //@TODO: Add to db
    if (isNewRecord) {
        const sql = `
        INSERT INTO income_details
        VALUES (?,?,?,?,?,?,?,?)
        `
        db.run(sql, params)
        console.log("TODO: add to db")
    }
    else {
        console.log("TODO: add to db")
    }
}

export const addExpenses = (req: Request, res: Response) => {
    const { uid, yearmonth, fashion, food, hobby, school } = req.body
    const userFilled = checkFieldFulfilled({fashion, food, hobby, school})
    if (!userFilled) {
        res.status(400).json({
            success: false,
            message: 'no input data to save.'
        })
        return
    }

    // Check if there are more savings in the same year&month
    const {isNewRecord, existingRecord} = checkSavingMonthExist(+uid, yearmonth)
    const params:(string|number)[] = [+uid, yearmonth, +fashion, +food, +hobby, +school]
    // If not, save it
    if (isNewRecord && existingRecord === null) {
        const sql = `
            INSERT INTO expense_details
            VALUES (?,?,?,?,?,?,?,?)
        `
        db.run(sql, params, (err: Error | null) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: err.message
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Data added.'
                })
            }
        })
    }
    // Else sum up the saving values
    else {
        console.log(existingRecord)
    }

    // Move to total update.
    // next()
}

export const updateTotal = (req: Request, res: Response) => {
    const sql = `UPDATE savings SET total = ? WHERE uid = ?`
    const params = [+req.body.total, +req.params.uid]
    
    db.run(sql, params, err => {
        if (err) {
            res.status(400).json({
                success: false
            })
            return
        }
        res.status(200).json({
            success: true,
            message: 'New total value has been added.'
        })
    })
}