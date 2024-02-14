const router = require('express').Router();
const { Thought } = require('../../models/Thought');


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
        res.json (thoughts);
    } catch (err) {
        res.status(500).json(err);
    };
};

// Create a thought
// don't forget to push the created thought's _id to the associated user's thoughts array field
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    };
};


// Update a thought
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate (
            { _id:req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
    } catch (err) {
        res.status(500).json(err);
    };
};

// Delete a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ id_: res.params.thoughtId });
        res.json({ message: "Thought deleted!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Routes
router.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought)

router.route('/thoughts/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)