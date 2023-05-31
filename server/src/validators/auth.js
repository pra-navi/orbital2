const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password')
.isLength({ min: 6, max: 30 })
.withMessage('Password must be between 6 to 30 characters.')

//check if username exists
const usernameExists = check('username').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [value,])
    if (rows.length) {
        throw new Error('Username already exists.')
    }
})

//login validation
const loginFieldsCheck = check('username').custom(async (value, { req }) => {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [value])

    //user.rows is data we need from the user
    if (!user.rows.length) {
        throw new Error('Username does not exist.')
    }

    const validPassword = await compare(req.body.password, user.rows[0].password)

    if (!validPassword) {
        throw new Error('Incorrect password.')
    }

    req.user = user.rows[0] // so can use when defining exports.login in auth.js (login function)
})

module.exports = {
    registerValidation: [password, usernameExists],
    loginValidation: [loginFieldsCheck],
}
