var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var GifSchema = new Schema({
  title: String,
  imgUrl: String,
  votes: Number

})

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  gifs:[GifSchema]

});

var BattleSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  playerOne: [UserSchema],
  playerTwo: [UserSchema],
  playerOneVotes: Number,
  playerTwoVotes: Number,
  winner: UserSchema
});

BattleSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


var Battle = mongoose.model("Battle", BattleSchema);
var User= mongoose.model("User", UserSchema);
var Gif = mongoose.model("Gif", GifSchema)

module.exports = {
  Battle,
  User,
  Gif
};
