const { v4: uuid } = require('uuid');

const Subscription = require('../models/subscriptions-model');
const User = require('../models/user-model');

const getAllSubscriptions  = (req, res, next) => {
    // get all the supscriptions associated with a certain user
    const { userId: user_id } = req.params;

    Subscription.getAll(user_id, (error, data) => {


        if(error){
            //imlpement error
        }
        else {
            console.log(req.params)
            console.log("recieved data")
            console.log("sendding " + JSON.stringify({"subscriptions":data}))
            res.send(JSON.stringify({"subscriptions":data}));
        }
    })

}
// get the info for a single subscription
const getSubscriptionById = (req, res, next) => {
    const { sid } = req.params;

    Subscription.getById(sid, (error, data) => {
        if(error){
            //implement error
        }
        else {
            res.send(JSON.stringify(data));
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
            User.getById(user_id, (error, data) => {
                
                if(error){
                    //implement error
                }
                else{
                    res.json({ message: `Alright ${data.f_name}! Your ${company} subscription has been stored` });
                }
            })
        }
    })
};

const updateSubscription = (req, res, next) => {
    //TODO: OPTIMIZE THIS PIECE OF CODE SINCE IT IS REPEATED IN CREATE SUBSCRIPTION
    const { plan_name, company, start_date, plan_type, cost } = req.body;
    const { userId: user_id, sid } = req.params;

    const newSubscription = new Subscription({
        plan_name,
        company,
        start_date,
        plan_type,
        cost,
        user_id
    });
    Subscription.update(sid, newSubscription, (error, data) => {
        if(error){
            //implement error
        }
        else {
            User.getById(user_id, (error, data) => {
                if(error){
                    console.log(error);
                    //implement error
                }
                else{
                    res.json({ message: `Alright ${data.f_name}, your subscription has been updated` })
                }
            })
        }
    })
}
exports.getAllSubscriptions = getAllSubscriptions;
exports.getSubscriptionById = getSubscriptionById;
exports.createSubscription = createSubscription;
exports.updateSubscription = updateSubscription;