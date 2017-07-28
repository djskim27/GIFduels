var mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/GIFduels');
var Gif = require("../models/user");
var User = require("../models/user");
var Battle = require("../models/user");

mongoose.Promise = global.Promise;

//Create new user
var david = new User({
    firstName: "David",
    lastName: "David",
    email: 'djs.kim27@gmail.com',
    gifs: []
    
});
david.save((err) => {
    if(err) console.log(err);

    console.log('battleOne created!');

})
mongoose.connection.close();