const aws = require('aws-sdk');
aws.config.update({region: process.env.DYNAMO_DB_REGION});
const db = new aws.DynamoDB();

const getPodcast = (podcastTitle, podcastAuthor) => {

    return new Promise((resolve, reject) => {

        console.log(`***** QUERYING FOR ${podcastTitle} PODCAST *****`);

        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': podcastTitle },
                ':a': { 'S': podcastAuthor}
            },
            KeyConditionExpression: 'TITLE = :p AND AUTHOR = :a',
            TableName: process.env.PODCAST_TABLE
        }

        db.query(params, (err, result) => {
            if (err) {
                console.error(`***** QUERY FOR ${podcastTitle} PODCAST FAILED *****`);
                console.error(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** SUCCESSFULLY QUERIED FOR ${podcastTitle} PODCAST *****`);
                resolve(result.Items);
            }
        });

    });

}

const getEpisodes = (podcastTitle, lookback) => {

    return new Promise((resolve, reject) => {

        console.log(`***** QUERYING FOR EPSIODES OF ${podcastTitle} *****`);

        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': podcastTitle }
            },
            TableName: process.env.EPISODE_TABLE,
            IndexName: 'PUBLICATION_INDEX',
            KeyConditionExpression: 'PODCAST = :p',
            ScanIndexForward: false,
            Limit: lookback
        }

        db.query(params, (err, result) => {
            if (err) {
                console.error(`***** QUERY FOR ${podcastTitle} EPISODES FAILED *****`);
                console.error(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** SUCCESSFULLY QUERIED FOR EPISODES OF ${podcastTitle} *****`);
                resolve(result.Items);
            }
        });

    });
}

const savePodcast = (podcast) => {
    
    return new Promise((resolve, reject) => {

        console.log(`***** SAVING ${podcast.title} PODCAST *****`);

        const params = {
            TableName: process.env.PODCAST_TABLE,
            Item: {
                'TITLE': { 'S': podcast.title },
                'AUTHOR': { 'S': podcast.author },
                'CATEGORY': { 'S': podcast.category },
                'IMAGE_URL': { 'S': podcast.imageUrl },
                'IMAGE_KEY': { 'S': podcast.imageKey }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.error(`***** COULD NOT SAVE DB ENTRY FOR PODCAST ${podcast.title} *****`);
                console.error(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** SUCCESSFULLY SAVED DB ENTRY FOR PODCAST: ${podcast.title} *****`);
                resolve(podcast);
            }
        });
    });

}

const saveEpisode = (episode) => {

    return new Promise((resolve, reject) => {

        console.log(`***** SAVING EPISODE ${episode.title} OF PODCAST ${episode.podcast} *****`);

        const params = {
            TableName: process.env.EPISODE_TABLE,
            Item: {
                'GUID': { 'S': episode.guid },
                'TITLE': { 'S': episode.title },
                'PODCAST': { 'S': episode.podcast },
                'AUTHOR': { 'S': episode.author },
                'DESCRIPTION': { 'S': episode.description },
                'PUBLICATION_DATE': { 'S': episode.pubDate },
                'DURATION': { 'S': episode.duration },
                'CATEGORY': { 'S': episode.category },
                'DOWNLOADS': { 'N': episode.downloads },
                'URL': { 'S': episode.url },
                'MP3_KEY': {'S' : episode.mp3Key }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.error(`***** COULD NOT SAVE DB ENTRY FOR EPISODE ${episode.title} OF PODCAST ${episode.podcast} *****`);
                console.error(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** SUCCESSFULLY SAVED DB ENTRY FOR EPISODE ${episode.title} OF PODCAST ${episode.podcast} *****`);
                resolve(episode);
            }
        });
    });

}

module.exports = {
    getPodcast,
    getEpisodes,
    savePodcast,
    saveEpisode
}