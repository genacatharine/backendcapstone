const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY
var jwtDecode = require('jwt-decode');

router.post('/:id', (req, res, next) => {

  console.log('RECEIVING FROM FRONTEND', req.body.clientToken)

  let uid = req.body.clientToken
  

  knex('tohikelist')
  .insert({
    users_id: uid,
    hike_id: 4,
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
router.get('/', (req, res, next)=>{
  console.log('hello routerget')
})


module.exports = router;
