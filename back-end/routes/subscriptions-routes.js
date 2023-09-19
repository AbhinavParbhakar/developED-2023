const express = require('express');

const { getAllSubscriptions,
        createSubscription, 
        getSubscriptionById,
        updateSubscription } = require('../controllers/subscriptions-controller');

const router = express.Router({ mergeParams: true });

router.get('/', getAllSubscriptions);

router.post('/', createSubscription);

router.get('/:sid', getSubscriptionById);

router.put('/:sid', updateSubscription);

module.exports = router;