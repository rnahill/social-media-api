const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            //must match a valid email address (Mongoose matching validation)
        },

        thoughts: [ 
            // array of _id values referencing the Thought model
        ],

        friends: [
            //array of _id values referencing the User model (self-reference)

        ]
        
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;