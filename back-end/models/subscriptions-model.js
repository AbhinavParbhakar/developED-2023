const sql = require('./db');

const Subscription = function (supscription) {
    this.plan_name  = this.plan_name,
    this.company = company,
    this.start_date = this.start_date,
    this.plan_type = this.plan_type,
    this.cost = this.cost,
    this.user_id = this.user_id

}

Subscription.getAll = (user_id, handler) => {
    sql.query(
        'SELECT * FROM subscription WHERE users_id = ?',
        user_id,
        (error, results) => {
            if(error) {
                handler(error, null);
            }
            else {
                handler(null, results)
            }
        }
    )
}

Subscription.getInfo = (sid, handler) => {
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