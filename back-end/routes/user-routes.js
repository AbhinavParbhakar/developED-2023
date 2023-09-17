const express = require('express');

const { getUserById,
        createUser, 
        updateUser } = require('../controllers/user-controller');
    
const subscriptionsRoutes = require('./subscriptions-routes');

const router = express.Router();


router.get('/:userId', getUserById);

router.post('/', createUser);

router.put('/:userId', updateUser);

router.use('/:userId/subscriptions', subscriptionsRoutes);


module.exports = router;
