const https = require('https');
const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

const createPodcast = async (TABLE_NAME, BUCKET_NAME) => {

    return getPodcastImage(BUCKET_NAME)
        .then(url => {
            return savePodcastItem(TABLE_NAME, url);
        })
        .catch(err => {
            console.log('***** FAILED TO CREATE THE DAILY PODCAST *****')
            console.log('***** FAILURE DUE TO: ' + err);
            reject(err);
        });

}

const savePodcastItem = async (TABLE_NAME, imageUrl) => {

    return new Promise((resolve, reject) => {

        const db = new aws.DynamoDB();
        const params = {
            TableName: TABLE_NAME,
            Item: {
                'PodcastName': { S: 'The Daily' },
                'PodcastAuthor': { S: 'The New York Times' },
                'PodcastCategory': { S: 'News & Politics' },
                'PodcastDownloads': { N: '0' },
                "PodcastImage": { S: imageUrl }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE THE DAILY PODCAST ITEM IN DB *****');
                console.log('***** FAILURE DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** THE DAILY PODCAST ITEM SUCCESSFULLY SAVED *****')
                console.log(JSON.stringify(result));
                resolve(result);
            }
        });

    });

}

const getPodcastImage = async (BUCKET_NAME) => {

    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {

        const req = https.get('https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/f5/78/c7/f578c7e9-10d9-ef82-f8c0-708f7f1aa2ca/source/600x600bb.jpg', (res) => {

            s3.upload({
                ACL: 'private',
                Bucket: BUCKET_NAME,
                Key: 'TheDaily.jpg',
                Body: res,
                ContentType: 'image/jpeg'
            }, (err, result) => {
                if (err) {
                    console.log('***** FAILED TO UPLOAD IMAGE OF THE DAILY *****');
                    console.log('***** ERROR DUE TO: ' + err);
                    reject(err);
                } else {
                    console.log('***** SUCCESSFULLY UPLOADED IMAGE OF THE DAILY *****');
                    console.log(result);
                    resolve(result.Location);
                }
            });

        });

        req.end();

    });

}

module.exports = createPodcast;