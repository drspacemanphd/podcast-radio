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
                author: feed['itunes:author'][0],
                description: entry['itunes:summary'][0].replace(/[“”]/g, '"').replace(/[\r\n]+/g, ' ').trim(),
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
    rssEntry.pubDate = moment(rssEntry.pubDate).format('YYYY-MM-DD');
    return rssEntry;
}

module.exports = {
    getRssFeed
}


// const fetch = require('node-fetch');
// const xml2js = require('xml2js');
// const RssEntryBuilder = require('common-config/src/common-model/RssEntry');
// const moment = require('moment');

// const getLatestRSSEntry = (params) => {

//     return new Promise((resolve, reject) => {

//         fetch(params.rssUrl)
//             .then(res => res.text())
//             .then(xml => {
//                 xml2js.parseString(xml, { async: true }, (err, result) => {
//                     if (err) reject(err);
//                     else {
//                         let podcastTitle = result.rss.channel[0].title[0];
//                         let rssEntry = result.rss.channel[0].item.slice(params.startIndex, params.startIndex + 1);
//                         resolve(parseRssForEntry(podcastTitle, rssEntry));
//                     }
//                 })
//             })
//             .catch((error) => {
//                 console.error(`***** XML PARSING FOR EPISODES OF ${params.podcastName} FAILED *****`, error)
//                 reject(error);
//             });

//     });

// }

// const parseRssForEntry = (podcast, rssEntry) => {

//     return new RssEntryBuilder()
//         .guid(rssEntry[0].guid[0]._)
//         .podcast(podcast)
//         .title(rssEntry[0].title[0])
//         .publicationDate(moment(rssEntry[0].pubDate[0]).format('YYYY-MM-DD'))
//         .link(rssEntry[0].enclosure[0]['$'].url)
//         .duration(rssEntry[0]['itunes:duration'][0])
//         .build();

// }

// module.exports = {
//     parse: getLatestRSSEntry
// }