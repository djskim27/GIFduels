const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/GIFduels');
mongoose.connect(process.env.MONGODB_URI);

const Battle = require('../models/battle');
const User = require('../models/user');
const Gif = require('../models/gif')

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Gif.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});


Battle.remove({}, function(err){
  console.log(err);
});

// Create new Gifs
const gifOne = new Gif({
  title: 'Hard',
  imgUrl: 'https://media.giphy.com/media/BYhoMtJMQsYVy/giphy.gif',
  votes: 0
});


// Create new users
const jace = new User({
  firstName: 'Jace',
  lastName: 'Garcia',
  userName: 'Weeeeee3',
  email: 'funtimes@example.com',
  gifs: [gifOne]
});

const david = new User({
  firstName: 'David',
  lastName: 'Kim',
  userName: 'DavidThaMan',
  email: "cool@example.com",
  gifs: [gifOne]
})


// create new battles
const danny = new Battle({
  playerOne: jace,
  playerTwo: david,
  playerOneVotes: 0,
  playerTwoVotes: 0,

});


// save the gif
gifOne.save(function(err) {
  if (err) console.log(err);
    console.log("gif created!");
});
// save the user
jace.save(function(err) {
  if (err) console.log(err);
    console.log("user jace created!");
});

david.save(function(err) {
  if (err) console.log(err);
    console.log("user david created!");
});

// save the battle
danny.save(function(err) {
  if (err) console.log(err);

  console.log('danny created!');
});

// console.log(jace);
console.log(danny);
mongoose.connection.close();
