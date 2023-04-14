import sqlite from 'sqlite3'
const SQL = sqlite.verbose()
const DBSOURCE = 'src/server/db/allowance.sqlite'
const db = new SQL.Database(DBSOURCE)

const CREATE_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    password text,
    UNIQUE(name, password)
)`

const CREATE_SAVINGS_TABLE = `
CREATE TABLE IF NOT EXISTS savings (
    uid integer PRIMARY KEY,
    total integer,
    FOREIGN KEY(uid) REFERENCES users(uid)
) WITHOUT ROWID`

const CREATE_EXPENSE_DETAIL_TABLE = `
CREATE TABLE IF NOT EXISTS expense_details (
    uid integer,
    yearmonth text PRIMARY KEY,
    year text,
    month text,
    fashion integer,
    food integer,
    hobby integer,
    school integer,
    FOREIGN KEY(uid) REFERENCES users(uid)
)`

const CREATE_INCOME_DETAIL_TABLE = `
CREATE TABLE IF NOT EXISTS income_details (
    uid interger,
    yearmonth text PRIMARY KEY,
    year text,
    month text,
    income integer,
    memo text,
    FOREIGN KEY(uid) REFERENCES users(uid)
) WITHOUT ROWID
`

const INIT_USER = ` INSERT INTO users
                    (name, password)
                    VALUES (?,?)`
const INIT_SAVINGS = `  INSERT INTO savings
                        (uid, total)
                        VALUES (?,?)`
const INIT_EXPENSES = `INSERT INTO expense_details
                    (uid, yearmonth, year, month, fashion, food, hobby, school)
                    VALUES (?,?,?,?,?,?,?,?)`
const INIT_INCOME = `INSERT INTO income_details
                    (uid, yearmonth, year, momth, income, memo)
                    VALUES (?,?,?,?,?,?)`

db.serialize(() => {
    // db.run(`DROP TABLE income_details`)

    // db.run(CREATE_USERS_TABLE,
    //     //@ts-ignore
    // (err, rows) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('savings table insert')
    //         const stmt = db.prepare(INIT_USER)
    //         // stmt.run(['tree', 'hello'])
    //     }
    // })

    // db.run(CREATE_SAVINGS_TABLE,
    // (err, rows) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('savings table insert')
    //         const stmt = db.prepare(INIT_SAVINGS)
    //         stmt.run([1, 0])
    //     }
    // })

    // db.run(CREATE_EXPENSE_DETAIL_TABLE,
    //     //@ts-ignore
    //     (err, rows) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log('expense_details table insert')
    //             const stmt = db.prepare(INIT_EXPENSES)
    //             // stmt.run([1, '2023'-1', '2023', '1', 100, 100, 0, 0])
    //         }
    //     })
    // db.run(CREATE_INCOME_DETAIL_TABLE,
    //     //@ts-ignore
    //     (err, rows) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log('income_details table insert')
    //             const stmt = db.prepare(INIT_INCOME)
    //             // stmt.run([1, '2023-1', '2023', '1', 100, 'my monthly allowance'])
    //         }
    //     })
})

export default db