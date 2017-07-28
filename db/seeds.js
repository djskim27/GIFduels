var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GIFduels');

var Battle = require('../models/battle');
var User = require('../models/user');
var Gif = require('../models/gif')

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
User.remove({}, function(err){
  console.log(err);
});

Battle.remove({}, function(err){
  console.log(err);
});

// create new battles
var danny = new Battle({
  playerOne: [{
    firstName: 'Jace',
    lastName: 'Garcia',
    userName: 'SuicideBySausage',
    email: 'fuck you',
    gifs: [{
      title: 'Old Grandma',
      imgUrl: 'https://media.giphy.com/media/l4KifsTQS8je40o9O/giphy.gif',
      votes: 0
    }]

  }],
  playerTwo: [{
    firstName: 'David',
    lastName: 'Kim',
    userName: 'Jiggaboo',
    email: "fuck me",
    gifs: [{
      title: 'Hard',
      imgUrl: 'https://media.giphy.com/media/BYhoMtJMQsYVy/giphy.gif',
      votes: 0
    }]


  }],
  playerOneVotes: 0,
  playerTwoVotes: 0,

});


// save the users
danny.save(function(err) {
  if (err) console.log(err);

  console.log('danny created!');
});


console.log(danny);
mongoose.connection.close();
