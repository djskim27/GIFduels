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
        gifs: user.gifs,
        gifId: user.gifs._id

        

        }
      
    );
  }).catch((error) => {
    console.log('Error retrieving users from database!');
    console.log(error);
  });
});

//Create Gif Form
router.get('/new', (req, res) => {
  const userId = req.params.id;

  res.render(
    'gifs/new',
    {userId},
  );
});
//POST ROUTE *****NOT WORKING CORRECTLY******
router.post('/', (req, res) => {
  const userId = req.params.id;
  const newGifInfo = req.body;
  var currentGif =[];


  User.findById(userId).then((user) => {
    const newGif = new Gif(newGifInfo);
    console.log(newGif)
    user.gifs.push(newGif);
    currentGif.push(newGif);
    return user.save();
    

  }).then((user) => {
    console.log('SUCCESS');

    res.render(
      'gifs/show',
      {
        userId,
        userName: user.userName,
        // userName: user.firstName,
        // gifId: newGif._id,
        gifId: currentGif[0]._id,
        title: currentGif[0].title,
        imgUrl: currentGif[0].imgUrl
      }
    );
  }).catch((error) => {
    console.log(error);
  });
    console.log(currentGif)
});

// Show route
router.get('/:gifId', (req, res) => {
  const userId = req.params.id;
  const gifId = req.params.gifId;
  User.findById(userId).then((user) => {
      
    const foundGif = user.gifs.find((gif) => {
        return gif.id === gifId;
    });
    // res.send(foundGif)
    res.render(
      'gifs/show',
      {
        userId,
        gifId,
        userName: user.userName,
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


//Edit Form For Gif
router.get('/:gifId/edit', (req, res) =>{
  const userId = req.params.id;
  const gifId = req.params.gifId;

  User.findById(userId).then((user) => {
    const foundGif = user.gifs.find((gif) => {
      return gif.id === gifId;
    });

    res.render('gifs/edit', {
      userId,
      gifId,
      title: foundGif.title,
      imgUrl: foundGif.imgUrl

    });
  });
});

//Update The Gif (PUT)
router.put('/:gifId', (req, res) => {
  const userId = req.params.id;
  const gifId = req.params.gifId;

  User.findById(userId).then((user) => {
    const foundGif = user.gifs.find((gif) => {
      return gif.id === gifId;
    });

    foundGif.title = req.body.title;
    foundGif.imgUrl = req.body.imgUrl;

    user.save();

    console.log('SUCCESS');

    return res.render(
      'gifs/show',
      {
        userId,
        gifId,
        title: foundGif.title,
        imgUrl: foundGif.imgUrl
      }
    );

  }).catch((error) => {
    console.log(error);
  });
  
});

//Delete GIF
router.get('/:gifId/delete', (req, res) => {
  const userId = req.params.id;
  const gifId = req.params.gifId;

  User.findById(userId).then((user) => {
    user.gifs.id(gifId).remove();

    return user.save();

  }).then((user) => {
    res.render(
      'gifs/index',
      {
        userId,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gifs: user.gifs,
        gifId: user.gifs._id
      }
    );
  }).catch((error) => {
    console.log(error);
  });
});

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