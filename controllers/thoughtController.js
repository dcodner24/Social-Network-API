const Thought = require('../models/Thought');
const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;

const getAllThoughts = async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getThoughtById = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        if (thoughtData) {
            res.status(200).json(thoughtData);
        } else {
            res.status(404).json({ message: `No thought id: ${req.params.thoughtId} found` })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
const newThought = async (req, res) => {
    try {
        console.log(req.body);
        const newThought = await Thought.create(req.body);
        if (!newThought) {
            res.status(400).json({ message: 'Thought could not be created', body: req.body })
        } else {
            const updatedUser = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought._id } }, { new: true });
            if (updatedUser) {
                res.status(200).json({ user: updatedUser, thought: newThought })
            } else {
                res.status(400).json({ message: `Cannot find user ${req.body.username} or issue with ${newThought._id}`, body: newThought })
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateThought = async (req, res) => {
    try {
        console.log(req.body);
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!updatedThought) {
            res.status(400).json({ message: 'Could not update thought', body: req.body })
        } else {
            console.log('Thought updated')
            res.status(200).json(updatedThought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!updatedThought) {
            res.status(404).json({ message: `Could not delete thought ${req.params.thoughtId}` })
        } else {
            console.log('Thought deleted')
            res.status(200).json(updatedThought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const createReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: {reactions: req.body} }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: `could not create reaction for thought ${req.params.thoughtId}`, body: req.body })
        } else {
            res.status(200).json(updatedThought)
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: {reactions:{ reactionId: req.params.reactionId}} } , { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: `Could not delete reaction for thought ${req.params.thoughtId}`, body: req.body })
        } else {
            res.status(200).json(updatedThought)
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { getAllThoughts, getThoughtById, newThought, updateThought, deleteThought, createReaction, deleteReaction }; // export what needs to be exported},