var express = require('express');
var router = express.Router();
const knex= require('../knex')


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .select(
      'id',
      'email'
    )
    .then(function(data){
      res.send(data)
    })
})


module.exports = router;
