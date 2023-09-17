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

const createSubscription = (req, res, next) => {
    const {sid, plan_name, company, start_date, plan_type, cost, user_id} = [uuid(), req.body]
    const newSubscription = new Subscription({
        plan_name,
        company,
        start_date,
        plan_type,
        cost,
        user_id
    });
    Subscription.create(sid, newSubscription, (error, data) => {
        if(error){
            //implement error
        }
        else {
            res.json(`Cool! Your ${company} subscription has been stored`)
        }
    })
}

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionInfo = getSubscriptionInfo;
exports.createSubscription = createSubscription;