const router = require('express').Router();
const { Thought, User } = require('../../models');


// Get all thoughts
const getAllThoughts = async (req, res) => {
    try{
       const thoughts = await Thought.find()
    } catch (err) {
        res.status(500).json(err);
    };
};

// Get one thought
const getOneThought = async (req, res) => {
    try{
        const thought = await Thought.findOne( { _id: req.params.thoughtId });
        res.json (thought);
    } catch (err) {
        res.status(500).json(err);
    };
};

// Create a thought
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        // Send success response
        res.json({ message: "Thought created!", thought });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
};


// Update a thought
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate (
            { _id:req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        res.json({ message: "Thought updated! " + thought });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Delete a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ id_: res.params.thoughtId });
        res.json({ message: "Thought deleted! " + thought });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Add a reaction
const createReaction = async (req, res) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtid },
            { $push: {reactions: req.body } },
            { runValidators: true, new: true }
            )
            res.json({ message: "Reaction created! " + reaction });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Remove a reaction
const deleteReaction = async (req, res) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtid },
            { $pull: {reactions: req.body } },
            )
            res.json({ message: "Reaction deleted! " + reaction });
    } catch (err) {
        res.status(500).json(err);
    };
}

// Routes
router.route('/')
    .get(getAllThoughts)
    .post(createThought)

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;