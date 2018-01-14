const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY
var jwtDecode = require('jwt-decode');

router.post('/:id', (req, res, next) => {
  let uid = req.body.clientToken
  let hid = req.body.id
  let name = req.body.name
  knex('tohikelist').insert({
    users_id: uid,
    hike_name: name,
    hike_id: hid
  }, '*').then(() => {
    res.sendStatus(200)
  })

})

router.get('/', function(req, res, next) {
  var token = req.body.clientToken
  console.log('TOKEN ON BACKEND', token)
  knex('tohikelist')
    .select('users_id', 'hike_id', 'hike_name')
    .where('users_id', uid)
    .then((data) => {
    return res.send(data)

    // res.setHeader('Content-Type', 'application/json')
    // res.send(JSON.stringify(data))
  }).catch((err) => next(err))
})

module.exports = router;
