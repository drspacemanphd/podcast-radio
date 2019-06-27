const aws = require('aws-sdk');

const createEpisodeTable = async (TABLE_NAME) => {

    aws.config.update({ region: 'us-east-1' });

    const params = {
        TableName: TABLE_NAME,
        AttributeDefinitions: [
            {
                AttributeName: 'EpisodeId',
                AttributeType: 'S'
            },
            {
                AttributeName: 'EpisodeTitle',
                AttributeType: 'S'
            },
            {
                AttributeName: 'EpisodePodcast',
                AttributeType: 'S'
            },
            {
                AttributeName: 'EpisodePublicationDate',
                AttributeType: 'S'
            },
            {
                AttributeName: 'EpisodeDownloads',
                AttributeType: 'N'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'EpisodeId',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'EpisodePodcast',
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
        GlobalSecondaryIndexes: [
            {
                IndexName: 'EPISODE_PUBLICATION_DATE',
                KeySchema: [
                    {
                        AttributeName: 'EpisodePodcast',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'EpisodePublicationDate',
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
            },
            {
                IndexName: 'EPISODE_DOWNLOADS',
                KeySchema: [
                    {
                        AttributeName: 'EpisodeId',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'EpisodeDownloads',
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
            },
            {
                IndexName: 'EPISODE_TITLE',
                KeySchema: [
                    {
                        AttributeName: 'EpisodeId',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'EpisodeTitle',
                        KeyType: 'RANGE'
                    }
                ],
                Projection: {
                    ProjectionType: 'KEYS_ONLY',
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

module.exports = createEpisodeTable;