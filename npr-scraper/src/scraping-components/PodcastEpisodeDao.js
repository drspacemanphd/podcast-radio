const moment = require('moment');
const uploadMp3 = require('./PodcastEpisodeUploader');
const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });
const db = new aws.DynamoDB();

const getLatestEpisodesFromDB = async (args) => {

    return new Promise((resolve, reject) => {

        const date = moment().subtract(args.retrievalWindowInDays, 'days');

        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': args.podcastName },
                ':d': { 'S': date.format('YYYY-MM-DD') }
            },
            IndexName: 'EPISODE_PUBLICATION_DATE',
            KeyConditionExpression: 'Podcast = :p and PublicationDate > :d',
            ProjectionExpression: 'EpisodeId, Title, Podcast, PublicationDate, Downloads, Link',
            TableName: args.tableName
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log('***** QUERY FOR ' + args.podcastName + ' EPISODES FAILED *****')
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** QUERY FOR ' + args.podcastName + ' EPISODES SUCCEEDED *****')
                resolve(result);
            }
        });

    });
}

const saveNewEpisode = async (episode, args) => {

    let key = episode.Title + '.mp3';
    let mp3 = await uploadMp3(episode.Link, key, args.bucketName, args.podcastName);

    return new Promise((resolve, reject) => {
                
        const params = {
            TableName: args.tableName,
            Item: {
                'EpisodeId': { S: episode.EpisodeId },
                'Title': { S: episode.Title },
                'Podcast': { S: episode.Podcast },
                'PublicationDate': { S: episode.PublicationDate },
                'Downloads': { N: episode.Downloads },
                'Link': { S: mp3.Location },
                'Duration': { S: episode.Duration }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE NEW EPISODE OF ' + args.podcastName + ' *****')
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** SUCCESSFULLY SAVED NEW EPISODE OF ' + args.podcastName + ' *****')
                resolve(result);
            }
        });

    });

}

module.exports = {
    getLatestEpisodesFromDB: getLatestEpisodesFromDB,
    saveNewEpisode: saveNewEpisode
}