const https = require('https');
const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

const createPodcast = async (TABLE_NAME, BUCKET_NAME) => {

    return getPodcastImage(BUCKET_NAME)
        .then(url => {
            return savePodcastItem(TABLE_NAME, url);
        })
        .catch(err => {
            console.log('***** FAILED TO CREATE FRESH AIR PODCAST *****')
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
                'PodcastName': { S: 'Fresh Air' },
                'PodcastAuthor': { S: 'NPR' },
                'PodcastCategory': { S: 'Society & Culture' },
                'PodcastDownloads': { N: '0' },
                "PodcastImage": { S: imageUrl }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE FRESH AIR PODCAST ITEM IN DB *****');
                console.log('***** FAILURE DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** FRESH AIR PODCAST ITEM SUCCESSFULLY SAVED *****')
                console.log(JSON.stringify(result));
                resolve(result);
            }
        });

    });

}

const getPodcastImage = async (BUCKET_NAME) => {

    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {

        const req = https.get('https://is5-ssl.mzstatic.com/image/thumb/Music113/v4/a5/3b/9c/a53b9c38-9cd6-51d9-099e-38ae77c39caa/source/600x600bb.jpg', (res) => {

            s3.upload({
                ACL: 'private',
                Bucket: BUCKET_NAME,
                Key: 'FreshAirImage.jpg',
                Body: res,
                ContentType: 'image/jpeg'
            }, (err, result) => {
                if (err) {
                    console.log('***** FAILED TO UPLOAD IMAGE OF FRESH AIR *****');
                    console.log('***** ERROR DUE TO: ' + err);
                    reject(err);
                } else {
                    console.log('***** SUCCESSFULLY UPLOADED IMAGE OF FRESH AIR *****');
                    console.log(result);
                    resolve(result.Location);
                }
            });

        });

        req.end();

    });

}

module.exports = createPodcast;