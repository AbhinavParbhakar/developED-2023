const sql = require('./db');

// IN MYSQL ADD A TRIGGER THAT ADDS PENDING EMAIL FOR SUBSCRIPTIONS ADDED THE SAME DAY THAT IS THEIR DUE DATE
// ADD COLUMNS TO VIEW pending_emails_pretty

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
        'SELECT BIN_TO_UUID(sid) AS sid, plan_name, company, start_date, plan_type, cost, BIN_TO_UUID(user_id) AS user_id FROM subscriptions WHERE user_id = UUID_TO_BIN(?)',
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
        'SELECT * FROM subscriptions_pretty WHERE sid = ?',
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
        'INSERT INTO subscriptions (sid, plan_name, company, start_date, plan_type, cost, user_id) VALUES (UUID_TO_BIN(?),?,?,CAST(? AS DATE),?,?,UUID_TO_BIN(?))',
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

Subscription.update = (sid, updatedSubscription, handler) => {
    console.log(updatedSubscription);
    console.log(sid);
    sql.query(
        'UPDATE subscriptions SET plan_name = ?, company = ?, start_date = ?, plan_type = ?, cost = ?, user_id = UUID_TO_BIN(?) WHERE sid = UUID_TO_BIN(?)',
        [...Object.values(updatedSubscription), sid],
        (error, results) => {
            if(error){
                handler(error, null)
            }
            else {
                handler(null, null)
            }
        }
    )
}

module.exports = Subscription;