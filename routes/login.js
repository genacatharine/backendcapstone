const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY

router.post('/', (req, res, next) => {
  const {
    email,
    password
  } = req.body

  if (!email || email.trim() === ('')) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if (!password || password.trim() === ('')) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if (email.includes('@')) {
    knex('users')
      .where('email', email)
      .first()
      .then((data) => {
        // console.log('data is', data)
        let match = bcrypt.compareSync(password, data.hashed_password)
        // console.log('JWT KEY', process.env.JWT_KEY)
        // console.log('match is', match)
        if (!match) {
          res.sendStatus(404)
          return
        }
        // console.log(
        //   'SECRET IS', SECRET)
        let token = jwt.sign({
          data: data[0]
          }, SECRET)

        res.cookie('token', token,
          { httpOnly: true }
        )
        res.status(200)
        delete data.hashed_password
        res.send(data)
        return
      })
      .catch((err) => next(err))
  }
})

router.delete('/', (req, res, next) => {
  console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
