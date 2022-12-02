const { Schema, model } = require('mongoose');
const User = require('./User')

// Schema to create Student model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String, required: true,
            minLength: 1, maxLength: 280
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
            unique: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: new Date,
            get: formatDate

        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            }
        ],
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        toJSON: {
            getters: true,
            id: false
        }
    });


thoughtSchema.virtual('reactionCount')
    .get(function () {
        if (this.reactions) {
            return this.reactions.length;
        }
    });
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
