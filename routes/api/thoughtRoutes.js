const Thought = require('../../models/Thought');

const router = require('express').Router();


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

const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    };
};

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

const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ id_: res.params.thoughtId });
        res.json({ message: "Thought deleted!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

router.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought)

router.route('/thoughts/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)