const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        username: {
            type: String,
            required: true,
        },

        reactions:[
            //array of nested documents within the reactionSchema
        ]
    }
);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;