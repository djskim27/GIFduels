const express = require('express');
const router = express.Router();

const User = require('../models/user');

// index router
router.get('/', (req, res) => {
    User.find({}).then((users) => {
      res.render(
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

// Show route
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId).then((user) => {
    console.log(user);
    res.render('users/show',
    { 
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
