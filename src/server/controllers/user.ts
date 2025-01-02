import type { Request, Response } from 'express'
import { updateDBMixin, checkYearMonthMixin } from './mixins'
import db from '../db/'

export const createUser = (req: Request, res: Response) => {
    const createUser = `INSERT INTO users (name, password) VALUES (?,?,?,?)`;
    const params = [req.body.name, req.body.password];
    const Executor = updateDBMixin(res)
    const updateDatabase = new Executor(createUser, params)
    updateDatabase.execute()
}

export const findUser = (req: Request, res: Response) => {
    const sql = `SELECT * FROM users WHERE uid = ? AND uuid = ?`
    const params = [req.body.uid, req.body.uuid]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'Not authorized.'
            })
        } else {
            console.log(row)
            res.status(200).json({
                success: true,
                data: row
            })
        }
    })
}