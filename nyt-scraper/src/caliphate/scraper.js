const fetch = require('node-fetch');
const xml2js = require('xml2js');
const aws = require('aws-sdk');
const moment = require('moment');
const https = require('https');

aws.config.update({ region: 'us-east-1' });
const db = new aws.DynamoDB();
const s3 = new aws.S3();

const scrape = async (index) => {

    return new Promise((resolve, reject) => {

        let latestRssEntry = getLatestRSSEntry(index);
        let latestEpisodesFromDB = getLatestEpisodesFromDB();

        Promise.all([latestRssEntry, latestEpisodesFromDB])
            .then(values => {
                return getNewEpisodes(values[0], values[1].Items);
            })
            .then(episode => {
                if (episode) return saveNewEpisode(episode);
                else {
                    console.log('***** NO NEW EPISODES OF CALIPHATE *****');
                    resolve(null);
                }
            })
            .then(episode => {
                resolve(episode);
            })
            .catch((err) => {
                console.error('***** CALIPHATE SCRAPE FAILED *****', err)
                reject(err);
            });

    });

}

const getLatestRSSEntry = async (index) => {

    return new Promise((resolve, reject) => {

        fetch(process.env.CALIPHATE_RSS_URL)
            .then((res) => {
                res.text()
                    .then(xml => {
                        xml2js.parseString(xml, { async: true }, (err, result) => {
                            if (result) resolve(result.rss.channel[0].item.slice(index, index + 1));
                            reject(err);
                        });
                    });
            })
            .catch((error) => {
                console.error('***** CALIPHATE SCRAPE FAILED *****', error)
                reject(error);
            });

    });

}

const getLatestEpisodesFromDB = async () => {

    return new Promise((resolve, reject) => {

        const params = {
            ExpressionAttributeValues: {
                ':p': { 'S': 'Caliphate' },
            },
            IndexName: 'EPISODE_PUBLICATION_DATE',
            KeyConditionExpression: 'Podcast = :p',
            ProjectionExpression: 'EpisodeId, Title, Podcast, PublicationDate, Downloads, Link',
            TableName: process.env.EPISODE_TABLE_NAME
        }

        db.query(params, (err, result) => {
            if (err) {
                console.log('***** QUERY FOR CALIPHATE EPISODES FAILED *****')
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** QUERY FOR CALIPHATE EPISODES SUCCEEDED *****')
                resolve(result);
            }
        });

    });
}

const getNewEpisodes = (latestRssEntry, savedEpisodes) => {

    let filteredEpisodes = savedEpisodes.filter((e) => {
        return e.EpisodeId.S === latestRssEntry[0].guid[0]._;
    });

    if (filteredEpisodes.length === 0) {
        return {
            EpisodeId: latestRssEntry[0].guid[0]._,
            Title: latestRssEntry[0].title[0],
            Podcast: 'Caliphate',
            PublicationDate: moment(latestRssEntry[0].pubDate[0]).format('YYYY-MM-DD'),
            Downloads: '0',
            TempLink: latestRssEntry[0].enclosure[0]['$'].url,
            Duration: latestRssEntry[0]['itunes:duration'][0]
        }
    } else return null;

}

const saveNewEpisode = async (episode) => {

    let key = episode.Title + '.mp3';
    let mp3 = await getMp3(key, episode.TempLink);

    return new Promise((resolve, reject) => {

        const params = {
            TableName: process.env.EPISODE_TABLE_NAME,
            Item: {
                'EpisodeId': { S: episode.EpisodeId },
                'Title': { S: episode.Title },
                'Podcast': { S: episode.Podcast },
                'PublicationDate': { S: episode.PublicationDate },
                'Downloads': { N: episode.Downloads },
                'Link': { S: mp3.Location },
                'Duration': { S: episode.Duration }
            }
        }

        db.putItem(params, (err, result) => {
            if (err) {
                console.log('***** FAILED TO SAVE NEW EPISODE OF CALIPHATE *****')
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            } else {
                console.log('***** SUCCESSFULLY SAVED NEW EPISODE OF CALIPHATE *****')
                resolve(params.Item);
            }
        });

    });

}

const getMp3 = async (key, url) => {

    return new Promise((resolve, reject) => {

        // Initial fetch to circumvent redirects
        fetch(url)
            .then(res => {
                return res.url;
            })
            .then(redirect => {

                const httpParams = {
                    timeout: 600000,
                    headers: {
                        'Content-Type': 'audio/mpeg'
                    }
                }

                const req = https.get(redirect, httpParams, (res) => {
                    
                    s3.upload({
                        ACL: 'private',
                        Bucket: process.env.CALIPHATE_BUCKET,
                        Key: key,
                        Body: res,
                        ContentType: 'audio/mpeg'
                    }, (err, result) => {
                        if (err) {
                            console.log('***** FAILED TO UPLOAD NEW EPISODE OF CALIPHATE *****')
                            console.log('***** ERROR DUE TO: ' + err);
                            reject(err);
                        } else {
                            console.log('***** SUCCESSFULLY UPLOADED NEW EPISODE OF CALIPHATE *****')
                            resolve(result);
                        }
                    });

                });

                req.end();

            })
            .catch(err => {
                console.log('***** FAILED TO FETCH NEW EPISODE OF CALIPHATE *****')
                console.log('***** ERROR DUE TO: ' + err);
                reject(err);
            });

    });

}

module.exports = {
    scrape: scrape
}