const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.post('/:id', (req, res, next) => {
  // console.log(`>>> ${req.params.id}`);
  // res.send(200);
  console.log('HELLOOOOOOOOOOOOOOO')
  let payloadid = req.body
  console.log('payloadid', payloadid)
  knex('tohikelist')
  .insert({
    hike_id: 2,
    users_id: 1
  }, '*')
  .then((data) => {
    let newObj = {
      'id': data[0].id,
      'users_id': data[0].users_id,
      'hike_id': data[0]
    }
    console.log('about to send response')
    res.send(newObj)
  }).catch((err) => {
    console.log('ERRORRRRR', err)
    next(err);
  });
})

module.exports = router;
