const router = require('express').Router();
const { User } = require('../../models/User')


// Get all users
const getUsers = async (req, res) => {
    try{
        const users = await User.find().populate('users');
        res.json(users);

    } catch (err) {
        res.status(500).json(err);
    };
};

// Get one user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }).populate('users');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create new user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a user
const updateUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        await User.deleteMany({ _id: { $in: user.thoughts}});
        res.json({ message: "User and thoughts deleted!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const addFriend = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
    } catch (err) {
        res.status(500).json(err);
    }
}

const removeFriend = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId } }
        )
    } catch (err) {
        res.status(500).json(err);
    }
}

// Routes

router.route('/users')
    .get(getUsers)
    .post(createUser)

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/api/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)