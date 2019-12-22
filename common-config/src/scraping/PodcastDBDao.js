const db = require('../aws/awsconfig').db;

const getPodcast = async (podcastTitle, podcastAuthor) => {

    try {
        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': podcastTitle },
                ':a': { 'S': podcastAuthor }
            },
            KeyConditionExpression: 'TITLE = :p AND AUTHOR = :a',
            TableName: process.env.PODCAST_TABLE
        }
        return await query(params);
    } catch (err) {
        console.error(`***** QUERY FOR ${podcastTitle} PODCAST FAILED *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const getEpisodes = async (podcastTitle, lookback) => {

    try {
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

        return await query(params);
    } catch (err) {
        console.error(`***** QUERY FOR ${podcastTitle} EPISODES FAILED *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const savePodcast = async (podcast) => {
    
    try {
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

        await saveItem(params);

        return podcast;
    } catch (err) {
        console.error(`***** COULD NOT SAVE DB ENTRY FOR PODCAST ${podcast.title} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const saveEpisode = async (episode) => {

    try {
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
                'MP3_KEY': { 'S': episode.mp3Key }
            }
        }

        await saveItem(params);

        return episode;
    } catch (err) {
        console.error(`***** COULD NOT SAVE DB ENTRY FOR EPISODE ${episode.title} OF PODCAST ${episode.podcast} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const query = async (params) => {
    try {
        const result = await db.query(params).promise();
        return result.Items
    } catch (err) {
        console.error(`***** ERROR WHEN QUERYING DUE TO: ${err} *****`);
        throw err;
    }
}

const saveItem = async (params) => {
    try {
        const result = await db.putItem(params).promise();
        return result.Items
    } catch (err) {
        console.error(`***** ERROR WHEN SAVING DUE TO: ${err} *****`);
        throw err;
    }
}

module.exports = {
    getPodcast,
    getEpisodes,
    savePodcast,
    saveEpisode
}