const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY

router.post('/', (req, res, next) => {
  // console.log('test')
  // console.log(req.body)
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
    console.log('email', email);
    knex('users')
      .where('email', email)
      .first()
      .then((data) => {
        if (!data) {
          res.sendStatus(404)
        }

        let match = bcrypt.compareSync(password, data.hashed_password)

        if (!match) {
          res.sendStatus(404)
          return
        }

        let token = jwt.sign({
          usersid: data.id,
          data: data
        }, SECRET);

        res.send({token: token});
          // console.log('token', token);
          // res.json(token);
          // res.send('token', token,
          //   { httpOnly: true }
        // res.cookie('token', token,
        //   { httpOnly: true }
        // );
        res.status(200)
        delete data.hashed_password
        // res.send(data)
        return
      })
      .catch((err) => next(err))
  }
  else {
    // console.log('test4')
  }
})

router.delete('/', (req, res, next) => {
  // console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
