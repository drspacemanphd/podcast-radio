const aws = require('aws-sdk');

const createPodcastTable = async (TABLE_NAME) => {

    aws.config.update({ region: 'us-east-1' });

    const params = {
        TableName: TABLE_NAME,
        AttributeDefinitions: [
            {
                AttributeName: 'PodcastName',
                AttributeType: 'S'
            },
            {
                AttributeName: 'PodcastAuthor',
                AttributeType: 'S'
            },
            {
                AttributeName: 'PodcastCategory',
                AttributeType: 'S'
            },
            {
                AttributeName: 'PodcastDownloads',
                AttributeType: 'N'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'PodcastName',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'PodcastAuthor',
                KeyType: 'RANGE'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        StreamSpecification: {
            StreamEnabled: false
        },
        LocalSecondaryIndexes: [
            {
                IndexName: 'PODCAST_DOWNLOADS',
                KeySchema: [
                    {
                        AttributeName: 'PodcastName',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'PodcastDownloads',
                        KeyType: 'RANGE'
                    }
                ],
                Projection: {
                    ProjectionType: 'ALL',
                }
            },
            {
                IndexName: 'PODCAST_CATEGORIES',
                KeySchema: [
                    {
                        AttributeName: 'PodcastName',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'PodcastCategory',
                        KeyType: 'RANGE'
                    }
                ],
                Projection: {
                    ProjectionType: 'ALL',
                }
            }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'CATEGORY_DOWNLOADS',
                KeySchema: [
                    {
                        AttributeName: 'PodcastCategory',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'PodcastDownloads',
                        KeyType: 'RANGE'
                    }
                ],
                Projection: {
                    ProjectionType: 'ALL',
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        ]

    }

    const db = new aws.DynamoDB();

    db.createTable(params, (err, result) => {
        if (err) {
            console.log(`***** TABLE CREATION FAILED *****`);
            console.log(`***** FAILURE DUE TO: ${err}`);
            throw err;
        } else {
            console.log('***** TABLE SUCCESSFULLY CREATED *****')
            console.log(JSON.stringify(result));
            return 0;
        }
    });
}

module.exports = createPodcastTable;