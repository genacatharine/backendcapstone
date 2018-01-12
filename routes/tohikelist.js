const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.post('/:id', (req, res, next) => {
  knex('tohikelist')
  .insert({
    hike_id: req.body.hike_id
  }, '*')
  .then((data) => {
    let newObj = {
      'id': data[0].id,
      'user_id': data[0].user_id,
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
