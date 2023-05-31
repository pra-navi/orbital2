const {config} = require('dotenv');
// serve/send us the environment var when we need them
//to access the env variable that we create
config();

module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
}