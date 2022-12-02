const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


// Schema to create Student model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: new Date,
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: new Date,
            get: formatDate

        },
        username:
        {
            type: String,
            required: true
        }
        ,
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true
        }
    }
    );


thoughtSchema.virtual('reactionCount')
    .get(function () {
        if (this.reactions) {
            return this.reactions.length;
        }
    });

function formatDate(createdAt) {
    return createdAt.toDateString();
}
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
