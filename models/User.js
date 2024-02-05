const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },

        username: {
            type: String,
            required: true,
            // unique
            //trimmed
        },

        email: {
            type: String,
            required: true,
            // unique
            //must match a valid email address (Mongoose matching validation)
        },

        thoughts: [ 
            // array of _id values referenceing the Thought model
        ],

        friends: [
            //array of _id values referencing the User model (self-reference)

        ]


        
    }
);

module.exports = userSchema;