const express = require('express');

const { getUserById,
        createUser, 
        updateUser, 
        validateUser} = require('../controllers/user-controller');
    
const subscriptionsRoutes = require('./subscriptions-routes');

const router = express.Router();


router.get('/:userId', getUserById);

router.post('/', createUser);

router.post('/validate',validateUser)

router.put('/:userId', updateUser);

router.use('/:userId/subscriptions', subscriptionsRoutes);


module.exports = router;
