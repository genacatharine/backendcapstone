const knex = require('../knex');
const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
  console.log('cookies', req.cookies);
  jwt.verify(req.cookies['mhj-jwt'], secret, (err, payload) => {
    if (err) {
      console.log('you hit your own error code dumbass', err);
      res.sendStatus(401)
    }
    console.log('before', payload);
    req.payload = payload
    console.log("payload: >>>", payload)
    next()
  })
}

router.post('/:id', auth, (req, res, next) => {
  // console.log(`>>> ${req.params.id}`);
  let payloadid = req.payload.usersid
  knex('tohikelist')
  .insert({
    user_id: payloadid,
    hike_id: req.body.hike_id
  }, '*')
  .then((data) => {
    console.log('DATA backend', data)
    let newObj = {
      'user_id': payloadid,
      'hike_id': data[0]
    }
    res.send(newObj)
  }).catch((err) => {
    next(err);
  });
})

module.exports = router;
