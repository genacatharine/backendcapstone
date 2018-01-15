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
  let thumbnail = req.body.thumbnailUrl
  console.log('thumbnail: ', thumbnail)
  knex('tohikelist').insert({
    users_id: uid,
    hike_name: name,
    hike_id: hid,
    thumbnail_url: thumbnail
  }, '*').then(() => {
    res.sendStatus(200)
  })

})

router.get('/', (req, res, next) => {

  const token = req.headers.authorization

  const decoded = jwt.verify(token, SECRET);

  knex('tohikelist').where('users_id', decoded.userId).then((data) => {
    // console.log(data);
    res.json(data)

  }).catch((err) => next(err))
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  console.log('ID', id)
  // knex('tohikelist')
  //   .where('title', asst)
  //   .first()
  //   .then(({id, title}) => {
  //     return knex('helps')
  //       .del()
  //       .where('hike_id': hid)
  //       .andWhere('user_id', decoded.userId)
  //       .returning('assignment_id')
  //   }).then((data) => {
  //     res.send(data)
  //   }).catch((err) => next(err))
})

module.exports = router;
