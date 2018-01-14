const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY

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

router.get('/', (req, res, next) => {

  const token = req.headers.authorization

  console.log('TOKEN ON BACKEND', token)

  const decoded = jwt.verify(token, SECRET);

  console.log('decoded jwt: ', decoded);

  knex('tohikelist')
    // .select('users_id', 'hike_id', 'hike_name')
    .where('users_id', decoded.userId)
    .then((data) => {
      console.log(data);
      // console.log('DATA',data)
    res.json(data)

  })
  .catch((err) => next(err))
})

module.exports = router;
