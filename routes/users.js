'use strict';
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-as-promised');
const knex = require('../knex')

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashed_password) => {
      console.log(hashed_password)
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
  })

module.exports = router;
