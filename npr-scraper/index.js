process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();

const handler = async (event, context, callback) => {
    console.log("NPR");
}

module.exports = handler;