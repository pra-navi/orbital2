//connect nodejs to postgresql db with pg
const { Pool } = require('pg')

const pool = new Pool({
    user: 'learners_users_user',
    host: 'dpg-chrlmj9mbg5e1f7haif0-a',
    database: 'learners_users',
    password: '6k8QWQB45VUf3caNXNTYA8JKXUHqAHPJ',
    port: 5432
})

pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
      // You can now perform database operations using the client object
    }
})
/*
module.exports = {
    query: (text, params) => pool.query(text, params),
}
*/

