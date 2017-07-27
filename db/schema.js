const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//GIF Schema
const gifSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: true,
        unique: true
    },
    votes: {
        type: Number
    }
});

const Gifs = mongoose.model('Gifs', gifSchema)
//export GIFS with module.exports()
module.exports = Gifs;