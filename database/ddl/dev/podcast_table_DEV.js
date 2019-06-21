require('dotenv-flow').config({
    node_env: 'development'
});

const script = require('../podcast_table_template');
script(process.env.PODCAST_TABLE_NAME);