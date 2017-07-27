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

//User Schema
const userSchema = new Schema({

    firstName: {

        type: String,
        required: true

    },
    lastName: {

        type: String,
        required: true

    },
    email: {

        type: String,
        required: true,
        unique: true,
        
    },
    created_at: Date,
    updated_at: Date,
    gifs: [gifSchema]

});

//Battle Schema
const battleSchema = new Schema({

    userOne: {

        type: String,
        required: true

    },
    userTwo: {

        type: String,
        required: true

    },
    created_at: Date,
    winner: {

        type: String,
        required: true,
        
    }

});


const Gif = mongoose.model('Gif', gifSchema);
const User = mongoose.model('User', userSchema);
const Battle = mongoose.model('Battle', battleSchema);
//export GIFS with module.exports()
module.exports = {

    Gif,
    User,
    Battle

}