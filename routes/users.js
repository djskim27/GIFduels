const express = require('express');
const router = express.Router();

const User = require('../models/user');


// index router
router.get('/', (req, res) => {
    User.find({}).then((users) => {
      res.send(
        'users/index',
        { users }
      );
    }).catch((error) => {
    console.log('Error retrieving users from database!');
    console.log(error);
    });
});

//create user
router.get('/new', (req, res) => {
    res.render('users/new');
});



module.exports = router;
