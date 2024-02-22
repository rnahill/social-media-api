const router = require('express').Router();
const { Thought, User } = require('../../models');


// Get all thoughts
const getAllThoughts = async (req, res) => {
    try{
       const thoughts = await Thought.find().populate('thoughts');
       res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    };
};

// Get one thought
const getOneThought = async (req, res) => {
    try{
        const thought = await Thought.findOne( { _id: req.params.thoughtId }).populate('thoughts');
        res.json (thought);
    } catch (err) {
        res.status(500).json(err);
    };
};

// Create a thought
// don't forget to push the created thought's _id to the associated user's thoughts array field
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        });
        res.json({ message: "Thought created! " + thought });
    } catch (err) {
        res.status(500).json(err);
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