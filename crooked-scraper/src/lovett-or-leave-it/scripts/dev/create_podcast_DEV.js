require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('common-config/src/scripts/create_podcast_template');

const params = {
    podcast: process.env.LOVETT_OR_LEAVE_IT_NAME,
    podcastAuthor: 'Crooked Media',
    podcastCategory: 'News & Politics',
    bucketName: process.env.S3_BUCKET,
    tableName: process.env.PODCAST_TABLE_NAME,
    imageUrl: process.env.LOVETT_OR_LEAVE_IT_IMAGE_URL,
    imageKey: process.env.LOVETT_OR_LEAVE_IT_IMAGE_KEY
}

script(params);


