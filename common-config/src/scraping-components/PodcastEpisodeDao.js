const uploadMp3 = require('./PodcastEpisodeUploader');
const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });
const db = new aws.DynamoDB();

const getLatestEpisodesFromDB = (args) => {

    return new Promise((resolve, reject) => {

        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': args.podcastName },
            },
            IndexName: 'EPISODE_PUBLICATION_DATE',
            KeyConditionExpression: 'Podcast = :p',
            ProjectionExpression: 'EpisodeId, Title, Podcast, PublicationDate, Downloads, EpisodeS3Bucket, EpisodeS3Key',
            TableName: args.tableName
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log(`***** QUERY FOR ${args.podcastName} EPISODES FAILED *****`)
                console.log(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** QUERY FOR ${args.podcastName} EPISODES SUCCEEDED *****`)
                resolve(result);
            }
        });

    });
}

const saveNewEpisode = async (rssEntry, args) => {

    let title = rssEntry.title + '.mp3';
    title = title.replace('/', 'and');
    let episodeKey = args.keyPrefix + '/' + title;
    await uploadMp3(rssEntry.link, episodeKey, args.bucketName, args.podcastName);

    return new Promise((resolve, reject) => {
        
        const params = {
            TableName: args.tableName,
            Item: {
                'EpisodeId': { S: rssEntry.guid },
                'Title': { S: rssEntry.title },
                'Podcast': { S: rssEntry.podcast },
                'PublicationDate': { S: rssEntry.publicationDate },
                'Downloads': { N: '0' },
                'EpisodeS3Bucket': { S: args.bucketName },
                'EpisodeS3Key': { S: episodeKey },
                'Duration': { S: rssEntry.duration }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log(`***** FAILED TO SAVE NEW EPISODE OF ${args.podcastName} *****`)
                console.log(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** SUCCESSFULLY SAVED NEW EPISODE OF '${args.podcastName} *****`)
                resolve(result);
            }
        });

    });

}

module.exports = {
    getLatestEpisodesFromDB: getLatestEpisodesFromDB,
    saveNewEpisode: saveNewEpisode
}