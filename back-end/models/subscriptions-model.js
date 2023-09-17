const sql = require('./db');

const Subscription = function (subscription) {
    this.plan_name  = subscription.plan_name,
    this.company = subscription.company,
    this.start_date = subscription.start_date,
    this.plan_type = subscription.plan_type,
    this.cost = subscription.cost,
    this.user_id = subscription.user_id

}

Subscription.getAll = (user_id, handler) => {
    sql.query(
        'SELECT * FROM subscriptions WHERE user_id = UUID_TO_BIN(?)',
        user_id,
        (error, results) => {
            if(error) {
                handler(error, null);
            }
            else {
                handler(null, results);
            }
        }
    )
}

Subscription.getById = (sid, handler) => {
    sql.query(
        'SELECT * FROM subscriptions WHERE sid=?',
        sid,
        (error, results) => {
            if(error){
                handler(error, null);
            }
            else {
                handler(null, results);
            }
        }
    )
}

Subscription.create = (sid, newSubscription, handler) => {
    console.log(newSubscription);
    sql.query(
        'INSERT INTO subscriptions (sid, plan_name, company, start_date, plan_type, cost, user_id) VALUES (UUID_TO_BIN(?),?,?,?,?,?,UUID_TO_BIN(?))',
        [sid, ...Object.values(newSubscription)],
        (error, results) => {
            if(error) {
                handler(error, null);
            }
            else{
                handler(null, null);
            }
        }
    )
}

module.exports = Subscription;