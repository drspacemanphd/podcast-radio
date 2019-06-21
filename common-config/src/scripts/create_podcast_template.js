const https = require('https');
const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

const createPodcast = (scriptParams) => {

    savePodcastImage(scriptParams)
        .then(key => savePodcastItem(scriptParams, key))
        .catch(err => {
            console.log(`***** FAILED TO CREATE ${scriptParams.podcast} PODCAST *****`)
            console.log(`***** FAILURE DUE TO: ${err} *****`);
        });

}

const savePodcastItem = (scriptParams, imageKey) => {

    return new Promise((resolve, reject) => {

        const db = new aws.DynamoDB();
        const dbParams = {
            TableName: scriptParams.tableName,
            Item: {
                'PodcastName': { S: scriptParams.podcast },
                'PodcastAuthor': { S: scriptParams.podcastAuthor },
                'PodcastCategory': { S: scriptParams.podcastCategory },
                'PodcastDownloads': { N: '0' },
                'PodcastBucket': { S: scriptParams.bucketName },
                'PodcastImageKey': { S: imageKey }
            }
        }

        db.putItem(dbParams, (err, result) => {
            if (err) {
                console.log(`***** FAILED TO SAVE ${scriptParams.podcast} PODCAST ITEM IN DB *****`);
                console.log(`***** FAILURE DUE TO: ${err} *****`);
                reject(err);
            } else {
                console.log(`***** ${scriptParams.podcast} PODCAST ITEM SUCCESSFULLY SAVED *****`)
                console.log(JSON.stringify(result));
                resolve(result);
            }
        });

    });

}

const savePodcastImage = (scriptParams) => {

    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {

        const req = https.get(scriptParams.imageUrl, (res) => {

            s3.upload({
                ACL: 'private',
                Bucket: scriptParams.bucketName,
                Key: 'public/' + scriptParams.imageKey,
                Body: res,
                ContentType: 'image/jpeg'
            }, (err, result) => {
                if (err) {
                    console.log(`***** FAILED TO UPLOAD IMAGE OF ${scriptParams.podcast} *****`);
                    console.log(`***** ERROR DUE TO: ${err} *****`);
                    reject(err);
                } else {
                    console.log(`***** SUCCESSFULLY UPLOADED IMAGE OF ${scriptParams.podcast} *****`);
                    console.log(result);
                    resolve(scriptParams.imageKey);
                }
            });

        });

        req.end();

    });

}

module.exports = createPodcast;