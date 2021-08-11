const pgp = require('pg-promise')()

const username = process.env.PG_USER || 'postgres'
const password = process.env.PG_PASSWORD 
const host = process.env.PG_HOST || 'localhost'
const port = process.env.PG_PORT || '5432'
const database = 'mrcoffee'

const connection = `postgres://${username}:${password}@${host}:${port}/${database}`

const db = pgp(connection)

module.exports = db