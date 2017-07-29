const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user');
const Gif = require('../models/gif');

// index router
router.get('/', (req, res) => {
  const userIdToFind = req.params.id;

  
  User.findById(userIdToFind).then((user) => {
    res.render(
      'gifs/index', 
      {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gifs: user.gifs

        

        }
      
    );
  }).catch((error) => {
    console.log('Error retrieving users from database!');
    console.log(error);
  });
});

// //create user
// router.get('/new', (req, res) => {
//   res.render('users/new');
// });

// router.post('/', (req, res) => {
//   const newUserForm = req.body;
//   User.create(newUserForm)
//     .then((user) => {
//       res.render(
//         'users/show', {
//         gifId: user._id,
//         userName: user.userName,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//         // gif: user.gifs[0].imgUrl
//         });
//     }).catch((error) => {
//       console.log('Error saving new user to database!');
//       console.log(error);
//     })
// })

// Show route
router.get('/:gifId', (req, res) => {
  const userId = req.params.id;
  const gifId = req.params.gifId;
  User.findById(userId).then((user) => {
      
    const foundGif = user.gifs.find((gif) => {
        return gif.id === gifId;
    });

    res.render(
      'gifs/show',
      {
        title: foundGif.title,
        imgUrl: foundGif.imgUrl,
        votes: foundGif.votes
      },
    );
      
}).catch((error) => {
     console.log(`Failed to find gif with ID of ${gifId}`);
    console.log(error);
});
});





// //Delete Route
// router.get('/:id/delete', (req, res) => {
//   const gifIdToDelete = req.params.id;

//   User.findByIdAndRemove(gifIdToDelete).then(() => {
//     console.log('HOORAY');
//     res.redirect('/users')
//   });
// });

// //Render Edit Form For User
// router.get('/:id/edit', (req, res) => {
//   const gifIdToFind = req.params.id;
//   User.findById(gifIdToFind)
//     .then( (user) => {
//       res.render('../views/users/edit', {
//         gifId: user._id,
//         userName: user.userName,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//         // gif: user.gifs[0].imgUrl
//       }
//       );
//     })
// })
// //Update Route
// router.put('/:id', (req, res) => {

//   const gifIdToUpdate = req.params.id;
//   const updatedUserInfo = req.body;

//   User.findByIdAndUpdate(
//       gifIdToUpdate,
//       updatedUserInfo,
//       {new: true} 
//   ).then((user) => {
//     console.log(`User with ID of ${user._id} updated!`);

//     res.render(
//         'users/show',
//           {
//         gifId: user._id,
//         userName: user.userName,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//         // gif: user.gifs[0].imgUrl
//       }
//     );
//   }).catch((error) => {
//     console.log(`User with ID of ${user._id} failed to update!`);
//     console.log(error);
//   });

// });


module.exports = router;