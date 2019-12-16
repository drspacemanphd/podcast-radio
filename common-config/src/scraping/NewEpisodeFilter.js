const _ = require('lodash');

const filter = (rssFeedEntries, episodeIds) => {
    return rssFeedEntries.filter(r => !episodeIds.includes(r.guid));
}

module.exports = {
    filter
}