const fetch = require('node-fetch');
const aws = require('aws-sdk');
aws.config.update({ region: process.env.S3_REGION });
const s3 = new aws.S3();

const savePodcastImage = (url, dns) => {

    return new Promise((resolve, reject) => {
        fetch(url, { redirect: 'follow', follow: 5 })
            .then(res => res.buffer())
            .then(res => {
                console.log(`***** BEGINNING UPLOAD IMAGE OF ${dns + '.jpg'} *****`);
                s3.upload({
                    ACL: 'authenticated-read',
                    Bucket: process.env.S3_BUCKET,
                    Key: dns + '/' + dns + '.jpg',
                    Body: res,
                    ContentType: 'image/jpeg'
                }, (err, result) => {
                    if (err) {
                        console.error(`***** FAILED TO UPLOAD IMAGE OF ${dns + '.jpg'} *****`);
                        console.error(`***** ERROR DUE TO: ${err} *****`);
                        reject(err);
                    }
                    console.log(`***** SUCCESSFULLY UPLOADED IMAGE: ${dns + '.jpg'} *****`);
                    resolve(result);
                });
            });
    });

}

const saveEpisodeMp3 = (url, dns, title) => {

    return new Promise((resolve, reject) => {
        fetch(url, { redirect: 'follow', follow: 5 })
            .then(res => res.buffer())
            .then(res => {
                console.log(`***** BEGINNING UPLOAD OF ${dns + '/' + title + '.mp3'} *****`);
                s3.upload({
                    ACL: 'authenticated-read',
                    Bucket: process.env.S3_BUCKET,
                    Key: dns + '/' + title + '.mp3',
                    Body: res,
                    ContentType: 'audio/mpeg'
                }, (err, result) => {
                    if (err) {
                        console.error(`***** FAILED TO SAVE EPISODE ${dns + '/' + title + '.mp3'} *****`);
                        console.error(`***** ERROR DUE TO: ${err} *****`);
                        reject(err);
                    }
                    console.log(`***** SUCCESSFULLY UPLOADED EPISODE: ${dns + '/' + title + '.mp3'} *****`);
                    resolve(result);
                });
            });
    });

}

module.exports = {
    savePodcastImage,
    saveEpisodeMp3
}