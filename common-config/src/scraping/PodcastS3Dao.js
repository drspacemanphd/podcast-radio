const fetch = require('node-fetch');
const s3 = require('../aws/awsconfig').s3;

const savePodcastImage = async (url, imageKey) => {

    try {
        let image = await fetchResource(url);
        console.log(`***** BEGINNING UPLOAD IMAGE OF ${imageKey} *****`);

        const params = {
            ACL: 'authenticated-read',
            Bucket: process.env.S3_BUCKET,
            Key: imageKey,
            Body: image,
            ContentType: 'image/jpeg'
        }

        return await uploadResource(params);
    } catch (err) {
        console.error(`***** FAILED TO UPLOAD IMAGE OF ${imageKey} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const saveEpisodeMp3 = async (url, mp3Key) => {

    try {
        let mp3 = await fetchResource(url);
        console.log(`***** BEGINNING UPLOAD MP3 OF ${mp3Key} *****`);

        const params = {
            ACL: 'authenticated-read',
            Bucket: process.env.S3_BUCKET,
            Key: mp3Key,
            Body: mp3,
            ContentType: 'audio/mpeg'
        }

        return await uploadResource(params);
    } catch (err) {
        console.error(`***** FAILED TO UPLOAD MP3 OF ${mp3Key} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const fetchResource = async (url) => {
    try {
        let resource = await fetch(url, { redirect: 'follow', follow: 5 });
        return await resource.buffer();
    } catch (err) {
        console.error(`***** FAILED TO FETCH RESOURCE FROM ${url} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }
}

const uploadResource = async (params) => {
    try {
        let result = await s3.upload(params).promise();
        console.log(`***** SUCCESSFULLY UPLOADED: ${params.Key} *****`);
        return result;
    } catch (err) {
        console.error(`***** FAILED TO UPLOAD: ${params.Key} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }
}

module.exports = {
    savePodcastImage,
    saveEpisodeMp3
}