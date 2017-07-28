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

//create user form
router.get('/new', (req, res) => {
    res.render('users/new');
});

//user show router
router.get('/:id', (req, res) => {
  const userIdToSearchDbFor = req.params.id;

  User.findById(userIdToSearchDbFor).then((user) => {
    console.log(user.items);
    res.render(
        'users/show',
        {
          user,
          userItems: user.items
        }
    );
  }).catch((error) => {
    console.log(`Error retrieving user with ID of ${userIdToSearchDbFor}`);
    console.log(error);
  });
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
