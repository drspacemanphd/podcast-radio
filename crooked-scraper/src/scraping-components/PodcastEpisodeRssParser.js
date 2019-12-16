const fetch = require('node-fetch');
const xml2js = require('xml2js');
const moment = require('moment');

const getRssFeed = async (rssUrl, lookback) => {

    try {

        console.log(`***** RETRIEVING RSS FEED FOR URL ${rssUrl} *****`);

        let xml = await fetchXml(rssUrl)
        let parsedXml = await parseXml(xml);

        const feed = parsedXml.rss.channel[0];
        const rawEntries = feed.item;
        if (rawEntries.length > lookback) rawEntries.splice(lookback, rawEntries.length - lookback);

        const rssEntries = rawEntries.map(entry => {
            return {
                guid: entry.guid[0]._,
                title: entry.title[0].replace(/[“”]/g, '').replace(/\//g, 'and').trim(),
                author: entry['itunes:author'][0],
                description: entry.description[0],
                pubDate: entry.pubDate[0],
                duration: entry['itunes:duration'][0],
                mp3Location: entry.enclosure[0]['$'].url
            }
        });

        const processedEntries = rssEntries.map(entry => processEntry(entry));

        console.log(`***** SUCCESSFULLY RETRIEVED RSS FEED FOR URL ${rssUrl} *****`);

        return {
            title: feed.title[0].replace(/[“”]/g, '').trim(),
            author: feed['itunes:author'][0],
            category: feed['itunes:category'][0]['$'].text,
            imageUrl: feed['itunes:image'][0]['$'].href,
            entries: processedEntries
        }

    } catch (err) {
        console.error(`***** PARSING RSS FEED FOR URL ${rssUrl} FAILED *****`, err)
        throw err;
    }

}

const fetchXml = async (rssUrl) => {
    try {
        let rawResponse = await fetch(rssUrl);
        let xml = await rawResponse.text();
        return xml;
    } catch (err) {
        console.error(`***** FETCHING XML FOR URL ${rssUrl} FAILED *****`, err)
        throw err;
    }
}

const parseXml = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { async: true }, (err, result) => {
            if (err) {
                console.error(`***** PARSING XML FAILED *****`, err)
                reject(err);
            }
            resolve(result);
        });
    });
}

const processEntry = (rssEntry) => {
    let hours = Math.floor(rssEntry.duration / 3600);
    let minutes = Math.floor(rssEntry.duration / 60) - (hours * 60);
    let seconds = Math.floor(rssEntry.duration) - (hours * 3600) - (minutes * 60);

    rssEntry.pubDate = moment(rssEntry.pubDate).format('YYYY-MM-DD');
    rssEntry.duration = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    return rssEntry;
}

module.exports = {
    getRssFeed
}