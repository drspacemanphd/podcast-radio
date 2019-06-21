require('dotenv-flow').config({
    node_env: 'development'
});
const script = require('common-config/src/scripts/create_podcast_template');

const params = {
    podcast: process.env.NPR_POLITICS_NAME,
    podcastAuthor: 'NPR',
    podcastCategory: 'News & Politics',
    bucketName: process.env.S3_BUCKET,
    tableName: process.env.PODCAST_TABLE_NAME,
    imageUrl: process.env.NPR_POLITICS_IMAGE_URL,
    imageKey: process.env.NPR_POLITICS_IMAGE_KEY
}

script(params);