const express = require('express');
const router = express.Router();

const User = require('../models/user');

// index router
router.get('/', (req, res) => {
  User.find({}).then((users) => {
    res.render(
      'users/index', {
        users
      }
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

router.post('/', (req, res) => {
  const newUserForm = req.body;
  User.create(newUserForm)
    .then((user) => {
      res.render(
        'users/show', {
          userId: user._id,
          userName: user.userName
        });
    }).catch((error) => {
      console.log('Error saving new user to database!');
      console.log(error);
    })
})

// Show route
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId).then((user) => {
      console.log(user);
      res.render('users/show', {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gif: user.gifs[0].imgUrl
      })
    })
    .catch((error) => {
      console.log(error);
    });
});





//Delete Route
router.get('/:id/delete', (req, res) => {
  const userIdToDelete = req.params.id;

  User.findByIdAndRemove(userIdToDelete).then(() => {
    console.log('HOORAY');
    res.redirect('/users')
  });
});

//Render Edit Form For User
router.get('/:id/edit', (req, res) => {
  const userIdToFind = req.params.id;
  User.findById(userIdToFind)
    .then( (user) => {
      res.render('../views/users/edit', {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
      );
    })
})
//Update Route
router.put('/:id', (req, res) => {

  const userIdToUpdate = req.params.id;
  const updatedUserInfo = req.body;

  User.findByIdAndUpdate(
      userIdToUpdate,
      updatedUserInfo,
      {new: true} 
  ).then((user) => {
    console.log(`User with ID of ${user._id} updated!`);

    res.render(
        'users/show',
          {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gif: user.gifs[0].imgUrl
      }
    );
  }).catch((error) => {
    console.log(`User with ID of ${user._id} failed to update!`);
    console.log(error);
  });

});


module.exports = router;