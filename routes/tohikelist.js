const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY

router.post('/:id', (req, res, next) => {
  const decoded = jwt.verify(req.body.clientToken, SECRET);
  // console.log('reqbody', req.body)
  console.log('hikename', req.body.hikename);
  console.log('hikename with underscore', req.body.hike_name );
  // console.log('thumbnail', req.body.thumbnailUrl)
  // console.log('userid', decoded.userId);
  let hid = req.body.hike_id
  console.log('hikeid', req.body.hike_id);
  // let name = req.body.hikename
  // let thumbnail = req.body.thumbnailUrl

  // console.log('thumbnail: ', thumbnail)
  knex('tohikelist')
  .insert({
    // users_id: req.body.userId,
    users_id: decoded.userId,
    hike_name: req.body.hikename,
    // hike_name: name,
    hike_id: hid,
    img_thumbnail: req.body.thumbnailUrl
  }, '*').then(() => {
    res.sendStatus(200)
  })

})

router.patch('/:id', (req, res, next) => {
  const id= req.params.id
  console.log('id', id);
  console.log('thumbnail', req.body.thumbnailUrl);
  knex('tohikelist')
    .update({img_thumbnail: req.body.thumbnailUrl}, '*')
    .where('id', id)
    .then((data)=>{
      console.log('data: ', data[0]);
      // console.log('objectkeys', Object.keys(data));
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(data[0]))
    })
})


router.get('/', (req, res, next) => {
  const token = req.headers.authorization
  const decoded = jwt.verify(token, SECRET);
  knex('tohikelist')
  .where('users_id', decoded.userId)
  .then((data) => {
    res.json(data)
  }).catch((err) => next(err))
})

// router.delete('/:id', (req, res, next) => {
//   const id = req.params.id
//   console.log('ID', id)
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
// })

module.exports = router;
