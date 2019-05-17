const fetch = require('node-fetch');
const xml2js = require('xml2js');

const getLatestRSSEntry = async (params) => {

    return new Promise((resolve, reject) => {

        fetch(params.rssUrl)
            .then((res) => {
                res.text()
                    .then(xml => {
                        xml2js.parseString(xml, { async: true }, (err, result) => {
                            if (result) resolve(result.rss.channel[0].item.slice(params.startIndex, params.startIndex + 1));
                            reject(err);
                        });
                    });
            })
            .catch((error) => {
                console.error(`***** XML PARSING FOR EPISODES OF ${params.podcastName} FAILED *****`, error)
                reject(error);
            });

    });

}

module.exports = {
    parse: getLatestRSSEntry
}