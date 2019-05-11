const https = require('https');
const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

const createPodcast = async (TABLE_NAME, BUCKET_NAME) => {

    return getPodcastImage(BUCKET_NAME)
        .then(url => {
            return savePodcastItem(TABLE_NAME, url);
        })
        .catch(err => {
            console.log('***** FAILED TO CREATE POD SAVE AMERICA PODCAST *****')
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
                'PodcastName': { S: 'Pod Save America' },
                'PodcastAuthor': { S: 'Crooked Media' },
                'PodcastCategory': { S: 'News & Politics' },
                'PodcastDownloads': { N: '0' },
                "PodcastImage": { S: imageUrl }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE POD SAVE AMERICA PODCAST ITEM IN DB *****');
                console.log('***** FAILURE DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** POD SAVE AMERICA PODCAST ITEM SUCCESSFULLY SAVED *****')
                console.log(JSON.stringify(result));
                resolve(result);
            }
        });

    });

}

const getPodcastImage = async (BUCKET_NAME) => {

    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {

        const req = https.get(process.env.POD_SAVE_AMERICA_IMAGE_URL, (res) => {

            s3.upload({
                ACL: 'private',
                Bucket: BUCKET_NAME,
                Key: 'PodSaveAmericaImage.jpg',
                Body: res,
                ContentType: 'image/jpeg'
            }, (err, result) => {
                if (err) {
                    console.log('***** FAILED TO UPLOAD IMAGE OF POD SAVE AMERICA *****');
                    console.log('***** ERROR DUE TO: ' + err);
                    reject(err);
                } else {
                    console.log('***** SUCCESSFULLY UPLOADED IMAGE OF POD SAVE AMERICA *****');
                    console.log(result);
                    resolve(result.Location);
                }
            });

        });

        req.end();

    });

}

module.exports = createPodcast;