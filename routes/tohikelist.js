const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.post('/:id', (req, res, next) => {
  // console.log(`>>> ${req.params.id}`);
  let payloadid = req.payload.usersid
  knex('tohikelist')
  .insert({
    hike_id: req.body.hike_id
  }, '*')
  .then((data) => {
    console.log('DATA backend', data)
    let newObj = {
      'id': data[0].id,
      'user_id': data[0].user_id,
      'hike_id': data[0]
    }
    res.send(newObj)
  }).catch((err) => {
    next(err);
  });
})

module.exports = router;
