const fetch = require('node-fetch');
const https = require('https');
const aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });
const s3 = new aws.S3();

const uploadEpisode = (url, bucketKey, bucketName, podcastName) => {

    return new Promise((resolve, reject) => {

        // Initial fetch to circumvent redirects
        fetch(url)
            .then(res => {
                if (!res.url) throw new Error(`***** COULD NOT FIND REDIRECT URL FOR EPISODE *****`)
                return res.url;
            })
            .then(redirect => {

                const req = https.get(redirect, (res) => {

                    s3.upload({
                        ACL: 'private',
                        Bucket: bucketName,
                        Key: 'public/' + bucketKey,
                        Body: res,
                        ContentType: 'audio/mpeg'
                    }, (err, result) => {
                        if (err) {
                            console.log(`***** FAILED TO UPLOAD NEW EPISODE OF ${podcastName} *****`)
                            console.log(`***** ERROR DUE TO: ${err} *****`);
                            reject(err);
                        } else {
                            console.log(`***** SUCCESSFULLY UPLOADED NEW EPISODE OF ${podcastName} *****`)
                            resolve(result);
                        }
                    });

                });

                req.end();

            })
            .catch(err => {
                console.log(`***** FAILED TO FETCH NEW EPISODE OF ${podcastName} *****`)
                console.log(`***** ERROR DUE TO: ${err} *****`);
                reject(err);
            });

    });

}

module.exports = uploadEpisode;