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
            default: Date.not,
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

module.exports = thoughtSchema;