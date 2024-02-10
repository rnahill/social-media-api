const router = require('express').Router();
const { User } = require('../../models/User')


// Get all users
const getUsers = async (req, res) => {
    try{
        const users = await User.find().populate('users');
        res.json(users);

    } catch (err) {
        res.status(500).json(err);
    }
}

// Get one user

const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId}).populate('users');
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

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:userId')
    .get(getOneUser)