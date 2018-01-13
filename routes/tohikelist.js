const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY
var jwtDecode = require('jwt-decode');

router.post('/:id', (req, res, next) => {
  // console.log('RECEIVING FROM FRONTEND', req.body.clientToken)
  // console.log('RECEIVING FROM FRONTEND', req.body.hikeid)
  let uid = req.body.clientToken
  let hid= req.body.hikeid

  knex('tohikelist')
  .insert({
    users_id: uid,
    hike_id: hid,
  }, '*')
  .then(() => {
    res.sendStatus(200)
  })
  //   let newObj = {
  //     'id': data[0].id,
  //     'user_id': data[0].user_id,
  //     'hike_id': data[0]
  //   }
  // //   console.log('about to send response')
  //   res.send(newObj)
  // }).catch((err) => {
  //   console.log('ERRORRRRR', err)
  //   next(err);
  // });
})
// router.get('/', function(req, res, next) {
//   let uid = req.body.clientToken
//   knex('tohikelist')
//     // .select('id', 'users_id')
//     .where('users_id', uid)
//     .then((data) => {
//         return res.send(data)
//
//       res.setHeader('Content-Type', 'application/json')
//       res.send(JSON.stringify(data))
//     })
//     .catch((err) => next(err))
//   })



module.exports = router;
