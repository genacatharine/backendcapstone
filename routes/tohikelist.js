const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY

router.post('/:id', (req, res, next) => {
  let user_id = req.payload.usersId
  knex('tohikelist')
  .insert({
    user_id: decod,
    hike_id: req.body.hike_id
  }, '*')
  .then((data) => {
    let newObj = {
      'id': data[0].id,
      'user_id': data[0].user_id,
      'hike_id': data[0]
    }
  //   console.log('about to send response')
    res.send(newObj)
  }).catch((err) => {
    console.log('ERRORRRRR', err)
    next(err);
  });
})



module.exports = router;
