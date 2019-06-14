const fetch = require('node-fetch');
const xml2js = require('xml2js');
const RssEntryBuilder = require('common-config/src/common-model/RssEntry');
const moment = require('moment');

const getLatestRSSEntry = (params) => {

    return new Promise((resolve, reject) => {

        fetch(params.rssUrl)
            .then(res => res.text())
            .then(xml => {
                xml2js.parseString(xml, { async: true }, (err, result) => {
                    if (err) reject(err);
                    else {
                        let podcastTitle = result.rss.channel[0].title[0];
                        let rssEntry = result.rss.channel[0].item.slice(params.startIndex, params.startIndex + 1);
                        resolve(parseRssForEntry(podcastTitle, rssEntry));
                    }
                })
            })
            .catch((error) => {
                console.error(`***** XML PARSING FOR EPISODES OF ${params.podcastName} FAILED *****`, error)
                reject(error);
            });

    });

}

const parseRssForEntry = (podcast, rssEntry) => {

    let hours = Math.floor((rssEntry[0]['itunes:duration'][0]) / 3600);
    let minutes = Math.floor(rssEntry[0]['itunes:duration'][0] / 60) - (hours * 60);
    let seconds = Math.floor(rssEntry[0]['itunes:duration'][0]) - (hours * 3600) - (minutes * 60);

    let titleStr = rssEntry[0].title[0];

    for (let i = 0; i < titleStr.length; i++) {
        if (titleStr.charCodeAt(i) === 8220 || titleStr.charCodeAt(i) === 8221 || titleStr[i] === '"') {
            if (i === 0) titleStr = titleStr.slice(1, titleStr.length);
            else titleStr = titleStr.slice(0, i) + titleStr.slice(i + 1, titleStr.length);
            i--;
        }
    }

    return new RssEntryBuilder()
        .guid(rssEntry[0].guid[0]._)
        .podcast(podcast)
        .title(titleStr.trim())
        .publicationDate(moment(rssEntry[0].pubDate[0]).format('YYYY-MM-DD'))
        .link(rssEntry[0].enclosure[0]['$'].url)
        .duration(hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'))
        .build();

}

module.exports = {
    parse: getLatestRSSEntry
}