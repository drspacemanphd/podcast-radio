const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });

const createPodcast = async (TABLE_NAME) => {

    const db = new aws.DynamoDB();

    const params = {
        TableName: TABLE_NAME,
        Item: {
            'PodcastName': { S: 'Caliphate' },
            'PodcastAuthor': { S: 'The New York Times' },
            'PodcastCategory': { S: 'News & Politics' },
            'PodcastDownloads': { N: '0' }
        }
    }

    db.putItem(params, (err, result) => {
        if (err) {
            console.log('***** PODCAST ITEM CREATION FAILED *****');
            console.log('***** FAILURE DUE TO: ' + err);
            throw err;
        } else {
            console.log('***** ITEM SUCCESSFULLY SAVED *****')
            console.log(JSON.stringify(result));
            return 0;
        }        
    });

}

module.exports = createPodcast;