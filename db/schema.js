const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

const GifSchema = new Schema({
  title: String,
  imgUrl: String,
  votes: Number

})


const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  gifs:[GifSchema]
  

});


const BattleSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  users: [UserSchema],
  playerOne: UserSchema,
  playerTwo: UserSchema,
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


const Battle = mongoose.model("Battle", BattleSchema);
const User= mongoose.model("User", UserSchema);
const Gif = mongoose.model("Gif", GifSchema)

module.exports = {
  Battle,
  User,
  Gif
};
