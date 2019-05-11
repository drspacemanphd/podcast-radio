require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('../create_podcast_template');

script(process.env.PODCAST_TABLE_NAME, process.env.LOVETT_OR_LEAVE_IT_BUCKET);