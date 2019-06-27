const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });

const db = new aws.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

const getPodcasts = () => {

    return new Promise((resolve, reject) => {

        const params = {
            TableName: process.env.PODCAST_TABLE_NAME,
            IndexName: 'PODCAST_DOWNLOADS',
            ProjectionExpression: 'PodcastName, PodcastAuthor, PodcastCategory, PodcastDownloads, PodcastBucket, PodcastImageKey'
        }

        db.scan(params, (err, result) => {
            if (err) {
                console.log('***** ERROR RETRIEVING ALL PODCASTS *****');
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                resolve(result.Items);
            }
        });

    });

}

const getPodcastsByCategory = (category) => {
    
    return new Promise((resolve, reject) => {

        const params = {
            TableName: process.env.PODCAST_TABLE_NAME,
            ExpressionAttributeValues: {
                ':c': category
            },
            KeyConditionExpression: 'PodcastCategory = :c',
            IndexName: 'CATEGORY_DOWNLOADS',
            ProjectionExpression: 'PodcastName, PodcastAuthor, PodcastCategory, PodcastDownloads, PodcastBucket, PodcastImageKey'
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log('***** ERROR RETRIEVING ALL PODCASTS WITH CATEGORY ' + category + ' *****');
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                resolve(result.Items);
            }
        });

    });

}

const getEpisodesByPodcastName = (PodcastName) => {

    return new Promise((resolve, reject) => {
        
        const params = {
            TableName: process.env.EPISODE_TABLE_NAME,
            ExpressionAttributeValues: {
                ':p' : PodcastName
            },
            KeyConditionExpression: 'EpisodePodcast = :p',
            IndexName: 'EPISODE_PUBLICATION_DATE',
            ProjectionExpression: 'EpisodeId, EpisodePodcast, EpisodeDownloads, EpisodeS3Bucket, EpisodeS3Key, EpisodePublicationDate, EpisodeTitle, EpisodeDuration',
            ScanIndexForward: false
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log('***** ERROR RETRIEVING ALL EPISODES OF PODCAST ' + PodcastName + ' *****');
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                resolve(result.Items);
            }
        })
    });
}

module.exports = {
    getPodcasts: getPodcasts,
    getPodcastsByCategory: getPodcastsByCategory,
    getEpisodesByPodcastName: getEpisodesByPodcastName
}