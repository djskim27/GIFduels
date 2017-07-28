var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', (req, res) => {
    User.find({}).then((users) => {
      res.render(
        'users/index',
        { users },
      );
    }).catch((error) => {
    console.log('Error retrieving users from database!');
    console.log(error);
    });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
