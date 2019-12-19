const fetch = require('node-fetch');
const aws = require('aws-sdk');
aws.config.update({ region: process.env.S3_REGION });
const s3 = new aws.S3();

const savePodcastImage = (url, imageKey) => {

    return new Promise((resolve, reject) => {
        fetch(url, { redirect: 'follow', follow: 5 })
            .then(res => res.buffer())
            .then(res => {
                console.log(`***** BEGINNING UPLOAD IMAGE OF ${imageKey} *****`);
                s3.upload({
                    ACL: 'authenticated-read',
                    Bucket: process.env.S3_BUCKET,
                    Key: imageKey,
                    Body: res,
                    ContentType: 'image/jpeg'
                }, (err, result) => {
                    if (err) {
                        console.error(`***** FAILED TO UPLOAD IMAGE OF ${imageKey} *****`);
                        console.error(`***** ERROR DUE TO: ${err} *****`);
                        reject(err);
                    }
                    console.log(`***** SUCCESSFULLY UPLOADED IMAGE: ${imageKey} *****`);
                    resolve(result);
                });
            });
    });

}

const saveEpisodeMp3 = (url, mp3Key) => {

    return new Promise((resolve, reject) => {
        fetch(url, { redirect: 'follow', follow: 5 })
            .then(res => res.buffer())
            .then(res => {
                console.log(`***** BEGINNING UPLOAD OF ${mp3Key} *****`);
                s3.upload({
                    ACL: 'authenticated-read',
                    Bucket: process.env.S3_BUCKET,
                    Key: mp3Key,
                    Body: res,
                    ContentType: 'audio/mpeg'
                }, (err, result) => {
                    if (err) {
                        console.error(`***** FAILED TO SAVE EPISODE ${mp3Key} *****`);
                        console.error(`***** ERROR DUE TO: ${err} *****`);
                        reject(err);
                    }
                    console.log(`***** SUCCESSFULLY UPLOADED EPISODE: ${mp3Key} *****`);
                    resolve(result);
                });
            });
    });

}

module.exports = {
    savePodcastImage,
    saveEpisodeMp3
}