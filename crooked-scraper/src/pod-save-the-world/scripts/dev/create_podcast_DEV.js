require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('../create_podcast_template');

script(process.env.PODCAST_TABLE_NAME, process.env.POD_SAVE_THE_WORLD_BUCKET);


