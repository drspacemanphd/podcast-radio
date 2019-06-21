require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('common-config/src/scripts/create_podcast_template');

const params = {
    podcast: 'Caliphate',
    podcastAuthor: 'The New York Times',
    podcastCategory: 'News & Politics',
    bucketName: process.env.S3_BUCKET,
    tableName: process.env.PODCAST_TABLE_NAME,
    imageUrl: process.env.CALIPHATE_IMAGE_URL,
    imageKey: process.env.CALIPHATE_IMAGE_KEY
}

script(params);


