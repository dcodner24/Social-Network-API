const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;

const getUsers = async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getUserById = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId });
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: `No user id: ${req.params.userId} found` })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (!newUser) {
            res.status(404).json({ message: 'Could not create new user', body: req.body })
        } else {
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!updatedUser) {
            res.status(404).json({ message: `Could not edit user ${req.params.userId}`, body: req.body })
        } else {
            res.status(200).json(updatedUser)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findOneAndDelete({ _id: req.params.userId })
        if (!deleted) {
            res.status(404).json({ message: `Could not delete user ${req.params.userId}` })
        } else {
            console.log('User deleted')
            res.status(200).json(deleted);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const addFriend = async (req, res) => {
    try {
        console.log(`adding a friend to your friends list ${req.params.userId}, friend id ${req.params.friendId}`)
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: ObjectId(req.params.friendId) } }, { new: true });
        const friend = await User.findOneAndUpdate({ _id: req.params.friendId }, { $addToSet: { friends: ObjectId(req.params.userId) } }, { new: true });
        if (!user || !friend) {
            res.status(404).json({ message: `Could not find user ${req.params.userId}, or friend account does not exist, try again.` })
        } else {
            console.log('Friend added')
            res.status(200).json({ user: user, friend: friend })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const deleteFriend = async (req, res) => {
    try {
        console.log(`removing a friend from your friends list ${req.params.userId}, friend id ${req.params.friendId}`)
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pullAll: { friends: [ ObjectId(req.params.friendId) ] } }, { new: true });
        const friend = await User.findOneAndUpdate({ _id: req.params.friendId }, { $pullAll: { friends: [ ObjectId(req.params.userId) ] } }, { new: true });
        if (!user || !friend) {
            res.status(404).json({ message: `Could not find user ${req.params.userId}, or friend doesn't exist in friends list` })
        } else {
            res.status(200).json({user: user, removed_friend: friend});
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend }; // export what needs to be exported