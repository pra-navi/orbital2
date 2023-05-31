const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')
require('dotenv').config()

exports.getUsers = async (req, res) => {
    try {
        const {rows} = await db.query('SELECT user_id, username FROM users')
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.register = async (req, res) => {
    //console.log(req.body) // to debug
    const { username, password } = req.body //get username and password from req.body
    try {
        const hashedPassword = await hash(password, 10) //hash password
        await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]) //insert username and hashed password into db
        
        return res.status(201).json({ 
            success: true,
            message: 'User created successfully.' 
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.login = async (req, res) => {
    let user = req.user
  
    let payload = {
      id: user.user_id,
      username: user.username,
    }
  
    try {
    // all validations have been completed so now send user success message with JWT token (assign token)
        const token = await sign(payload, SECRET)
  
        //send user cookie
        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            success: true,
            message: 'Logged in successfully.',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: 'protected info',
        })
    } catch (error) {
        console.log(error.message)
    }
}
  
//only delete token stored inside client cos it is protected so no need check anything
exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'Logged out successfully.',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}   