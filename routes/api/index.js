const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.route('/users', userRoutes);
router.route('/thoughts', thoughtRoutes);

module.exports = router;