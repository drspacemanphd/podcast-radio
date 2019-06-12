const https = require('https');
const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

const createPodcast = (TABLE_NAME, BUCKET_NAME) => {

    return getPodcastImage(BUCKET_NAME)
        .then(url => savePodcastItem(TABLE_NAME, url))
        .catch(err => {
            console.log('***** FAILED TO CREATE NPR POLITICS PODCAST *****')
            console.log(`***** FAILURE DUE TO: ${err} *****`);
        });

}

const savePodcastItem = (TABLE_NAME, imageUrl) => {

    return new Promise((resolve, reject) => {

        const db = new aws.DynamoDB();
        const params = {
            TableName: TABLE_NAME,
            Item: {
                'PodcastName': { S: 'The NPR Politics Podcast' },
                'PodcastAuthor': { S: 'NPR' },
                'PodcastCategory': { S: 'News & Politics' },
                'PodcastDownloads': { N: '0' },
                "PodcastImage": { S: imageUrl }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE NPR POLITICS PODCAST ITEM IN DB *****');
                console.log(`***** FAILURE DUE TO: ${err} + *****`);
                reject(err);
            } else {
                console.log('***** NPR POLITICS PODCAST ITEM SUCCESSFULLY SAVED *****')
                console.log(JSON.stringify(result));
                resolve(result);
            }
        });

    });

}

const getPodcastImage = (BUCKET_NAME) => {

    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {

        const req = https.get(process.env.NPR_POLITICS_IMAGE_URL, (res) => {

            s3.upload({
                ACL: 'private',
                Bucket: BUCKET_NAME,
                Key: 'NPRPoliticsImage.jpg',
                Body: res,
                ContentType: 'image/jpeg'
            }, (err, result) => {
                if (err) {
                    console.log('***** FAILED TO UPLOAD IMAGE OF NPR POLITICS *****');
                    console.log(`***** ERROR DUE TO: ${err} *****`);
                    reject(err);
                } else {
                    console.log('***** SUCCESSFULLY UPLOADED IMAGE OF NPR POLITICS *****');
                    console.log(result);
                    resolve(result.Location);
                }
            });

        });

        req.end();

    });

}

module.exports = createPodcast;