import db from '../db/index.js'

const getTotal = (req, res) => {
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

const updateTotal = (req, res) => {
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

const findUser = (req, res) => {
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

export default { getTotal, updateTotal, findUser }