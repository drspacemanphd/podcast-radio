require('dotenv-flow').config({
    node_env: 'development'
});

const script = require('../episode_table_template');
script(process.env.EPISODE_TABLE_NAME);