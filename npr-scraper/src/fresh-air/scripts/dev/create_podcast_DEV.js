require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('common-config/src/scripts/create_podcast_template');

const params = {
    podcast: process.env.FRESH_AIR_NAME,
    podcastAuthor: 'NPR',
    podcastCategory: 'Society & Culture',
    bucketName: process.env.S3_BUCKET,
    tableName: process.env.PODCAST_TABLE_NAME,
    imageUrl: process.env.FRESH_AIR_IMAGE_URL,
    imageKey: process.env.FRESH_AIR_IMAGE_KEY
}

script(params);


