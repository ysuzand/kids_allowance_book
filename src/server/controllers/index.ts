import type { Request, Response, NextFunction } from 'express'
import db from '../db/'

import {
    checkSavingMonthExist,
    checkFieldFulfilled
} from './utils'

const getTotal = (req: Request, res: Response) => {
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

const addSavingDetails = (req: Request, res: Response, next: NextFunction) => {
    const { uid, year, month, fashion, food, hobby, school, income } = req.body
    const userFilled = checkFieldFulfilled({fashion, food, hobby, school, income})
    if (userFilled) {
        // Check if there are more savings in the same year&month
        const {isNewRow, row} = checkSavingMonthExist(uid, year, month)
        // If not, save it
        if (isNewRow && row === null) {
            const sql = `
                ISNERT INTO saving_detail
                VALUES (
                    ${uid},
                    ${year},
                    ${month},
                    ${fashion},
                    ${food},
                    ${hobby},
                    ${school},
                    ${income})
            `
        }
        // Else sum up the saving values
        else {
            console.log(row)
        }
    }
    // Move to total update.
    next()
}

const updateTotal = (req: Request, res: Response) => {
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

const findUser = (req: Request, res: Response) => {
    const sql = `SELECT * FROM users WHERE uid = ?`
    const params = [req.body.uid]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'Not authorized.'
            })
        } else {
            res.status(200).json({
                success: true,
                data: row
            })
        }
    })
}

export {
    getTotal,
    updateTotal,
    addSavingDetails,
    findUser
}