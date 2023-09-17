const { v4: uuid } = require('uuid');

const Subscription = require('../models/subscriptions-model');

const getAllSubscriptions  = (req, res, next) => {
    // get all the supscriptions associated with a certain user
    const { userId: user_id } = req.params;

    Subscription.getAll(user_id, (error, data) => {
        if(error){
            //imlpement error
        }
        else {
            res.send(data);
        }
    })

}
// get the info for a single subscription
const getSubscriptionById = (req, res, next) => {
    const { sid } = req.params;
    console.log(sid);
    Subscription.getById(sid, (error, data) => {
        if(error){
            //implement error
        }
        else {
            res.send(data);
        }
    });
}

const createSubscription = (req, res, next) => {
    const { plan_name, company, start_date, plan_type, cost } = req.body;
    const { userId: user_id } = req.params;

    const sid = uuid();

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
            res.json({ message: `Cool! Your ${company} subscription has been stored` });
        }
    })
};

exports.getAllSubscriptions = getAllSubscriptions;
exports.getSubscriptionById = getSubscriptionById;
exports.createSubscription = createSubscription;