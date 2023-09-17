const { v4: uuid } = require('uuid');

const Subscription = require('../models/subscriptions-model');

const getSubscriptions  = (req, res, next) => {
    // get all the supscriptions associated with a certain user
    const {user_id} = req.params;
    Subscription.getAll(user_id, (error, data) => {
        if(error){
            //imlpement error
        }
        else {
            res.json({data});
        }
    })

}
// get the info for a single subscription
const getSubscriptionInfo = (req, res, next) => {
    const {sid} = req.params;
    Subscription.getById(sid, (error, data) => {
        if(error){
            //implement error
        }
        else {
            res.json({data})
        }
    })

}

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionInfo = getSubscriptionInfo;