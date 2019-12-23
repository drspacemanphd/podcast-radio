const dbClient = require('../config/aws/awsconfig').dbClient;

const getPodcasts = async () => {

    try {
        const params = { TableName: process.env.PODCAST_TABLE }
        let result = await dbClient.scan(params).promise();
        return result.Items;
    } catch (err) {
        console.log(`***** ERROR RETRIEVING ALL PODCASTS *****`);
        console.log(`***** ERROR DUE TO: ${err}`);
        throw err;
    }

}

const getPodcastsByCategory = async (category) => {
    
    try {
        const params = {
            TableName: process.env.PODCAST_TABLE,
            ExpressionAttributeValues: {
                ':c': category
            },
            KeyConditionExpression: 'CATEGORY = :c',
            IndexName: 'CATEGORY_INDEX',
        }
        const result = await dbClient.query(params).promise();
        return result.Items;
    } catch (err) {
        console.log(`***** ERROR RETRIEVING ALL PODCASTS OF CATEGORY ${category} *****`);
        console.log(`***** ERROR DUE TO: ${err}`);
        throw err;
    }

}

const getEpisodesByPodcastName = async (podcast) => {

    try {
        const params = {
            TableName: process.env.EPISODE_TABLE,
            ExpressionAttributeValues: {
                ':p': podcast
            },
            KeyConditionExpression: 'PODCAST = :p',
            IndexName: 'PUBLICATION_INDEX',
            ScanIndexForward: false
        }
        const result = await dbClient.query(params).promise();
        return result.Items;
    } catch (err) {
        console.log(`***** ERROR RETRIEVING ALL EPISODES OF PODCAST ${podcast} *****`);
        console.log(`***** ERROR DUE TO: ${err}`);
        throw err;
    }
    
}

module.exports = {
    getPodcasts,
    getPodcastsByCategory,
    getEpisodesByPodcastName
}