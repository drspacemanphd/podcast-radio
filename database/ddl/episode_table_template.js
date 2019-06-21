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
                AttributeName: 'Title',
                AttributeType: 'S'
            },
            {
                AttributeName: 'Podcast',
                AttributeType: 'S'
            },
            {
                AttributeName: 'PublicationDate',
                AttributeType: 'S'
            },
            {
                AttributeName: 'Downloads',
                AttributeType: 'N'
            },
            {
                AttributeName: 'EpisodeS3Key',
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'EpisodeId',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'Podcast',
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
                        AttributeName: 'Podcast',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'PublicationDate',
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
                        AttributeName: 'Downloads',
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
                IndexName: 'TITLE_S3_KEY',
                KeySchema: [
                    {
                        AttributeName: 'Title',
                        KeyType: 'HASH'
                    },
                    {
                        AttributeName: 'EpisodeS3Key',
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