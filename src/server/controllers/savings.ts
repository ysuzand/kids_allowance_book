import type { Request, Response } from 'express'
import db from '../db'

import {
    checkFieldFulfilled
} from '../utils'

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

const checkYearMonthMixin = (req: Request, res: Response) => {
    return class CheckThisMonthRecord {
        private params = [req.params.uid, req.params.yearmonth]
        private sql = ''

        constructor(sql: string) {
            this.sql = sql
        }
        
        excecute() {
            db.get(this.sql, this.params, (err, row: {yearmonth: string} | undefined) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Something wrong with request parameters.'
                    })
                }
        
                res.status(200).json({
                    success: true,
                    exist: !!row?.yearmonth
                })
            })
        }
    }
}

const checkThisMonthExpenses = (req: Request, res: Response) => {
    const sql = `
        SELECT *
        FROM expense_details
        WHERE uid = ? AND yearmonth = ?
    `
    const CheckBase = checkYearMonthMixin(req, res)
    const checkThisMonthExpenses = new CheckBase(sql)
    checkThisMonthExpenses.excecute()
}

const checkThisMonthIncome = (req: Request, res: Response) => {
    const sql = `
        SELECT *
        FROM income_details
        WHERE uid = ? AND yearmonth = ?
    `
    const CheckBase = checkYearMonthMixin(req, res)
    const checkThisMonthIncome = new CheckBase(sql)
    checkThisMonthIncome.excecute()
}

const updateDBMixin = (res: Response) => {
    return class AddRecord {
        private sql
        private params

        constructor(sql: string, params: (string|number)[]) {
            this.sql = sql
            this.params = params
        }

        execute() {
            db.run(this.sql, this.params, (err: Error | null) => {
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
    }
}

const addIncome = (req: Request, res: Response) => {
    const { uid, yearmonth, year, month, income, memo } = req.body
    if (!income) {
        res.status(400).json({
            success: false,
            message: 'No input data to save.'
        })
    } else {
        const sql = `
            INSERT INTO income_details
            VALUES (?,?,?,?,?,?,?,?)
        `
        const params = [+uid, yearmonth, year, month, +income, memo]
        const Executor = updateDBMixin(res)
        const updateDatabase = new Executor(sql, params)
        updateDatabase.execute()
    }
}

const addExpenses = (req: Request, res: Response) => {
    const { uid, yearmonth, fashion, food, hobby, school } = req.body
    const userFilled = checkFieldFulfilled({fashion, food, hobby, school})
    if (!userFilled) {
        res.status(400).json({
            success: false,
            message: 'no input data to save.'
        })
    } else {
        const sql = `
            INSERT INTO expense_details
            VALUES (?,?,?,?,?,?,?,?)
        `
        const params:(string|number)[] = [+uid, yearmonth, +fashion, +food, +hobby, +school]

        const Executor = updateDBMixin(res)
        const updateDatabase = new Executor(sql, params)
        updateDatabase.execute()
    }
}

const updateIncome = (req: Request, res: Response) => {
    //@TODO Query to update income in the same yearmonth row.
    res.status(200).json({
        success: true
    })
}

const updateExpenses = (req: Request, res: Response) => {
    //@TODO Query to update expenses in the same yeamonth row.
    res.status(200).json({
        success: true
    })
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

export {
    getTotal,
    checkThisMonthExpenses,
    checkThisMonthIncome,
    addExpenses,
    addIncome,
    updateExpenses,
    updateIncome,
    updateTotal
}
