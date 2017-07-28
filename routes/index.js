const express = require('express');
const router = express.Router();

const Battle = require('../models/battle');
// const User = require('../models/user');
/* GET home page. */
router.get('/', (req, res) => {
    Battle.find({}).then((battle) => {
      res.render(
        'homepage/index',
        { 
          // playerOne: User.playerOne,
          // playerTwo: User.playerTwo
          battle,
          gifOne: battle.playerOne
        }

      );
    }).catch((error) => {
    console.log('Error retrieving users from database!');
    console.log(error);
    });
          console.log(Battle.playerOne);
});

module.exports = router;