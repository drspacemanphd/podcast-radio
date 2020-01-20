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
                guid: entry.guid[0]['_'],
                title: entry.title[0].replace(/[“”]/g, '').replace(/\//g, 'and').trim(),
                author: feed['itunes:author'][0],
                description: entry['itunes:summary'][0].replace(/\n\n/g, '; ').trim(),
                pubDate: entry.pubDate[0],
                duration: entry['itunes:duration'][0],
                mp3Location: entry.enclosure[0]['$'].url
            }
        });

        const processedEntries = rssEntries.map(entry => processEntry(entry));

        console.log(`***** SUCCESSFULLY RETRIEVED RSS FEED FOR URL ${rssUrl} *****`);

        return {
            title: feed.title[0].replace(/[“”/]/g, '').trim(),
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

const parseXml = async (xml) => {
    try {
        return await xml2js.parseStringPromise(xml);
    } catch (err) {
        console.error(`***** ERROR PARSING XML *****`);
        console.error(`***** ERROR DUE TO ${err} *****`);
        throw err;
    }
}

const processEntry = (rssEntry) => {
    rssEntry.pubDate = moment(rssEntry.pubDate).format('YYYY-MM-DD');
    return rssEntry;
}

module.exports = {
    getRssFeed
}