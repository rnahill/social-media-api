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
        res.json({ message: "User created! " + user });
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
        res.json({ message: "User updated! " + user });
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

// Add a friend
const addFriend = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
        res.json({ message: "Friend added!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Remove a friend
const removeFriend = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId } }
        )
        res.json({ message: "Friend removed!" });
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

module.exports = router;