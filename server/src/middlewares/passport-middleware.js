const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

// check if user sends a cookie- token then return
const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => { // id is from payload from token- use it to define user
        try {
            const { rows } = await db.query(
                'SELECT user_id, username FROM users WHERE user_id = $1',
                [id]
            )

            if (!rows.length) {
                throw new Error('401 not authorized')
            }

            let user = { id: rows[0].user_id, username: rows[0].username } // can use this user object

            return await done(null, user)
        
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)