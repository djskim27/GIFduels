var mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/GIFduels');
var Gif = require("../models/user");
var User = require("../models/user");
var Battle = require("../models/user");

mongoose.Promise = global.Promise;

//clear database of existing users
User.remove({}, (err) => {
    console.log(err);
})


//Create a new user
var jace = new User({
    firstName: "Jace",
    lastName: "Garcia",
    email: 'djs.kim27@gmail.com',
    gifs: []
    
});
var kim = new User({
    firstName: "Kim",
    lastName: "Lai",
    email: 'djs.kim27@gmail.com',
    gifs: []
    
});
//Create a new battle
var testBattle = new Battle({
    userOne: 'korean',
    userTwo: 'korean',
    gifOneVotes: 0,
    gifTwoVotes: 0,
    winner: 'korean'

})

jace.save((err) => {
    if(err) console.log(err);

    console.log(jace + ' created!');

});
kim.save((err) => {
    if(err) console.log(err);

    console.log(kim + ' created!');

});
testBattle.save((err)=> {
    if (err) console.log(err);
    
    console.log(testBattle + "created");
})




mongoose.connection.close();