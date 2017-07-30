const express = require('express');
const router = express.Router({mergeParams: true});



const Gif = require('../models/gif');
const User = require('../models/user');
const Battle = require('../models/battle')

/* GET home page. */
router.get('/', function(req, res) {
    Battle.find({}).then((battles) =>{
      // console.log(battles[0].playerOne.gifs[0].imgUrl);
      // res.send(battles[0].playerOne.gifs[0].imgUrl);
 
      res.render(
        'homepage/index',
        {
          playerOne: battles[0].playerOne.userName,
          playerTwo: battles[0].playerTwo.userName,
          gifOne: battles[0].playerOne.gifs[0].imgUrl,
          gifTwo: battles[0].playerTwo.gifs[0].imgUrl

        }
      )
    })
    
});

module.exports = router;
