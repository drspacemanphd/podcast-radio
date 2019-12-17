const aws = require('aws-sdk');
aws.config.update({ region: process.env.DYNAMO_DB_REGION });
const db = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const getPodcasts = () => {

    return new Promise((resolve, reject) => {

        const params = {
            TableName: process.env.PODCAST_TABLE,
        }

        db.scan(params, (err, result) => {
            if (err) {
                console.log(`***** ERROR RETRIEVING ALL PODCASTS *****`);
                console.log(`***** ERROR DUE TO: ${err}`);
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
            TableName: process.env.PODCAST_TABLE,
            ExpressionAttributeValues: {
                ':c': category
            },
            KeyConditionExpression: 'CATEGORY = :c',
            IndexName: 'CATEGORY_INDEX',
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log(`***** ERROR RETRIEVING ALL PODCASTS OF CATEGORY ${category} *****`);
                console.log(`***** ERROR DUE TO: ${err}`);
                reject(err);
            } else {
                resolve(result.Items);
            }
        });

    });

}

const getEpisodesByPodcastName = (podcast) => {

    return new Promise((resolve, reject) => {
        
        const params = {
            TableName: process.env.EPISODE_TABLE,
            ExpressionAttributeValues: {
                ':p': podcast
            },
            KeyConditionExpression: 'PODCAST = :p',
            IndexName: 'PUBLICATION_INDEX',
            ScanIndexForward: false
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log(`***** ERROR RETRIEVING ALL EPISODES OF PODCAST ${podcast} *****`);
                console.log(`***** ERROR DUE TO: ${err}`);
                reject(err);
            } else {
                resolve(result.Items);
            }
        })
    });
}

module.exports = {
    getPodcasts,
    getPodcastsByCategory,
    getEpisodesByPodcastName
}