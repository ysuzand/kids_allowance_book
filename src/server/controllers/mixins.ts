import type { Request, Response } from 'express'
import db from '../db'

export const checkYearMonthMixin = (req: Request, res: Response) => {
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

export const updateDBMixin = (res: Response) => {
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