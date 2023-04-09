import sqlite from 'sqlite3'
const SQL = sqlite.verbose()
const DBSOURCE = 'src/server/db/allowance.sqlite'
const db = new SQL.Database(DBSOURCE)

const CREATE_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    password text
)`

const CREATE_SAVINGS_TABLE = `
CREATE TABLE IF NOT EXISTS savings (
    uid integer PRIMARY KEY,
    total integer,
    FOREIGN KEY(uid) REFERENCES users(uid)
) WITHOUT ROWID`

const CREATE_SAVING_DETAIL_TABLE = `
CREATE TABLE IF NOT EXISTS saving_detail (
    uid integer PRIMARY KEY,
    year text,
    month text,
    fashion integer,
    food integer,
    hobby integer,
    school integer,
    income interger,
    FOREIGN KEY(uid) REFERENCES users(uid)
) WITHOUT ROWID`

const INIT_USER = ` INSERT INTO users
                    (name, password)
                    VALUES (?,?)`
const INIT_SAVINGS = `  INSERT INTO savings
                        (uid, total)
                        VALUES (?,?)`
const INIT_DETAIL = `INSERT INTO saving_detail
                    (uid, year, month, fashion, food, hobby, school, income)
                    VALUES (?,?,?,?,?,?,?,?)`

db.serialize(() => {
    // db.run(`DROP TABLE saving_detail`)

    // db.run(CREATE_USERS_TABLE,
    // (err, rows) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('savings table insert')
    //         const stmt = db.prepare(INIT_USER)
    //         // stmt.run(['star', 'mypass'])
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

    // db.run(CREATE_SAVING_DETAIL_TABLE,
    //     (err, rows) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log('group table insert')
    //             const stmt = db.prepare(INIT_DETAIL)
    //             // stmt.run(['2023', '01', 100, 100, 0, 0])
    //         }
    //     })
})

export default db