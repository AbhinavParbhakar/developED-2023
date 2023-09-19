const express = require('express');

const { getAllSubscriptions,
        createSubscription, 
        getSubscriptionById } = require('../controllers/subscriptions-controller');

const router = express.Router({ mergeParams: true });

router.get('/', getAllSubscriptions);

router.post('/', createSubscription);

router.get('/:sid', getSubscriptionById);

module.exports = router;