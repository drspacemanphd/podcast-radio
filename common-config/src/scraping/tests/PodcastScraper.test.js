const dao = require('../PodcastDBDao');
const podcastCreator = require('../PodcastCreator');
const scraper = require('../PodcastScraper');

const rssParser = {
    getRssFeed: jest.fn()
};

jest.mock('../PodcastDBDao', () => {
    return {
        getPodcast: jest.fn(),
        getEpisodes: jest.fn()
    }
});

jest.mock('../PodcastCreator', () => {
    return {
        createPodcast: jest.fn(),
        createEpisode: jest.fn()
    }
});

beforeEach(() => {
    dao.getPodcast.mockReset();
    dao.getEpisodes.mockReset();
    rssParser.getRssFeed.mockReset();
    podcastCreator.createPodcast.mockReset();
    podcastCreator.createEpisode.mockReset();
});

test('test that new episodes of existing podcast can be saved', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const podcastDBEntry = {
        TITLE: { S: 'PODCAST_TITLE' },
        AUTHOR: { S: 'PODCAST_AUTHOR' },
        CATEGORY: { S: 'PODCAST_CATEGORY' },
        IMAGE_URL: { S: 'IMAGE_URL' },
        IMAGE_KEY: { S: 'IMAGE_KEY' }
    };

    const episodeDBEntries = [
        {
            GUID: { S: 'GUID_ONE' },
            TITLE: { S: 'EPISODE_ONE_TITLE' },
            PODCAST: { S: 'PODCAST_TITLE' },
            AUTHOR: { S: 'PODCAST_AUTHOR' },
            DESCRIPTION: { S: 'DESCRIPTION_ONE' },
            PUBLICATION_DATE: { S: '2019-01-01' },
            DURATION: { S: '20:00' },
            CATEGORY: { S: 'PODCAST_CATEGORY' },
            DOWNLOADS: { N: '0' },
            URL: { S: 'URL_ONE' },
            MP3_KEY: { S: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3' }
        }
    ];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedEpisodeOne = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup expected return
    const expected = [
        {
            guid: 'GUID_THREE',
            title: 'EPISODE_THREE_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_THREE',
            pubDate: '2019-01-03',
            duration: '20:00',
            mp3Location: 'URL_THREE',
        },
        {
            guid: 'GUID_TWO',
            title: 'EPISODE_TWO_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_TWO',
            pubDate: '2019-01-02',
            duration: '22:00',
            mp3Location: 'URL_TWO',
        }
    ];

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.resolve([podcastDBEntry]));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));

    // Test and assert
    return scraper.scrape(params)
        .then((data) => {
            expect(data).toEqual(expected);

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));
        
            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve([podcastDBEntry]));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(0);

            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(2);
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(1, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[0], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(1, Promise.resolve(savedEpisodeOne));
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(2, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[1], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(2, Promise.resolve(savedEpisodeTwo));
        });
});

test('test that episodes of new podcast can be saved', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const podcastDBEntries = [];
    const episodeDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedPodcast = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    };

    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeThree = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup expected return
    const expected = [
        {
            guid: 'GUID_THREE',
            title: 'EPISODE_THREE_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_THREE',
            pubDate: '2019-01-03',
            duration: '20:00',
            mp3Location: 'URL_THREE',
        },
        {
            guid: 'GUID_TWO',
            title: 'EPISODE_TWO_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_TWO',
            pubDate: '2019-01-02',
            duration: '22:00',
            mp3Location: 'URL_TWO',
        },
        {
            guid: 'GUID_ONE',
            title: 'EPISODE_ONE_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_ONE',
            pubDate: '2019-01-01',
            duration: '20:00',
            mp3Location: 'URL_ONE',
        }
    ];

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.resolve(podcastDBEntries));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createPodcast.mockImplementation(() => Promise.resolve(savedPodcast));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeThree));

    // Test and assert
    return scraper.scrape(params)
        .then((data) => {
            expect(data).toEqual(expected);

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve(podcastDBEntries));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(1);

            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(3);
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(1, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[0], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(1, Promise.resolve(savedEpisodeOne));
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(2, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[1], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(2, Promise.resolve(savedEpisodeTwo));
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(3, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[2], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(3, Promise.resolve(savedEpisodeThree));
        });
});

test('test that process is aborted when error is thrown saving podcast', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const podcastDBEntries = [];
    const episodeDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeThree = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.resolve(podcastDBEntries));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createPodcast.mockImplementation(() => Promise.reject(new Error('ERROR THROWN WHEN SAVING PODCAST')));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeThree));

    // Test and assert
    return scraper.scrape(params)
        .catch((error) => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN SAVING PODCAST'));

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve(podcastDBEntries));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(1);

            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(0);
        });
});

test('test that process is aborted when error is thrown saving a single episode', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const podcastDBEntries = [];
    const episodeDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedPodcast = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    };

    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    // Setup expected return
    const expected = [
        {
            guid: 'GUID_THREE',
            title: 'EPISODE_THREE_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_THREE',
            pubDate: '2019-01-03',
            duration: '20:00',
            mp3Location: 'URL_THREE',
        },
        {
            guid: 'GUID_TWO',
            title: 'EPISODE_TWO_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_TWO',
            pubDate: '2019-01-02',
            duration: '22:00',
            mp3Location: 'URL_TWO',
        },
        {
            guid: 'GUID_ONE',
            title: 'EPISODE_ONE_TITLE',
            author: 'PODCAST_AUTHOR',
            description: 'DESCRIPTION_ONE',
            pubDate: '2019-01-01',
            duration: '20:00',
            mp3Location: 'URL_ONE',
        }
    ];

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.resolve(podcastDBEntries));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createPodcast.mockImplementation(() => Promise.resolve(savedPodcast));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.reject(new Error('ERROR WHEN SAVING EPISODE THREE')));

    // Test and assert
    return scraper.scrape(params)
        .catch((error) => {
            expect(error).toEqual(new Error('ERROR WHEN SAVING EPISODE THREE'));

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve(podcastDBEntries));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(1);

            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(3);
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(1, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[0], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(1, Promise.resolve(savedEpisodeOne));
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(2, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[1], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(2, Promise.resolve(savedEpisodeTwo));
            expect(podcastCreator.createEpisode).toHaveBeenNthCalledWith(3, { title: 'PODCAST_TITLE', category: 'PODCAST_CATEGORY' }, expected[2], 'podcast-title');
            expect(podcastCreator.createEpisode).toHaveNthReturnedWith(3, Promise.reject(new Error('ERROR WHEN SAVING EPISODE THREE')));
        });
});

test('test that process is aborted when error is thrown getting podcast entry', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const episodeDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedPodcast = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    };

    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeThree = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.reject(new Error('ERROR GETTING PODCAST FROM DB')));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createPodcast.mockImplementation(() => Promise.resolve(savedPodcast));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeThree));

    // Test and assert
    return scraper.scrape(params)
        .catch((error) => {
            expect(error).toEqual(new Error('ERROR GETTING PODCAST FROM DB'));

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.reject(new Error('ERROR GETTING PODCAST FROM DB')));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(0);

            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(0);
        });
});

test('test that process is aborted when error is thrown getting episode entries', () => {

    // Setup inputs
    const rssFeed = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        entries: [
            {
                guid: 'GUID_THREE',
                title: 'EPISODE_THREE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_THREE',
                pubDate: '2019-01-03',
                duration: '20:00',
                mp3Location: 'URL_THREE',
            },
            {
                guid: 'GUID_TWO',
                title: 'EPISODE_TWO_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_TWO',
                pubDate: '2019-01-02',
                duration: '22:00',
                mp3Location: 'URL_TWO',
            },
            {
                guid: 'GUID_ONE',
                title: 'EPISODE_ONE_TITLE',
                author: 'PODCAST_AUTHOR',
                description: 'DESCRIPTION_ONE',
                pubDate: '2019-01-01',
                duration: '20:00',
                mp3Location: 'URL_ONE',
            }
        ]
    };

    const podcastDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedPodcast = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    };

    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeThree = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.resolve(rssFeed));
    dao.getPodcast.mockImplementation(() => Promise.resolve(podcastDBEntries));
    dao.getEpisodes.mockImplementation(() => Promise.reject(new Error('ERROR WHEN GETTING EPISODE ENTRIES')));
    podcastCreator.createPodcast.mockImplementation(() => Promise.resolve(savedPodcast));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeThree));

    // Test and assert
    return scraper.scrape(params)
        .catch((error) => {
            expect(error).toEqual(new Error('ERROR WHEN GETTING EPISODE ENTRIES'));

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.resolve(rssFeed));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve(podcastDBEntries));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.reject(new Error('ERROR WHEN GETTING EPISODE ENTRIES')));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(0);
            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(0);
        });
});

test('test that process is aborted when error is thrown getting rss feed', () => {

    // Setup inputs
    const podcastDBEntries = [];
    const episodeDBEntries = [];

    const params = {
        podcastTitle: 'PODCAST_TITLE',
        podcastAuthor: 'PODCAST_AUTHOR',
        rssUrl: 'RSS_URL',
        lookback: 3,
        rssParser: rssParser,
        dnsName: 'podcast-title'
    };

    // Setup data returned by mocks
    const savedPodcast = {
        title: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        category: 'PODCAST_CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    };

    const savedEpisodeOne = {
        guid: 'GUID_ONE',
        title: 'EPISODE_ONE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_ONE',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_ONE',
        mp3Key: 'PODCAST_TITLE/EPISODE_ONE_TITLE.mp3'
    };

    const savedEpisodeTwo = {
        guid: 'GUID_TWO',
        title: 'EPISODE_TWO_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_TWO',
        pubDate: '2019-01-02',
        duration: '22:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_TWO',
        mp3Key: 'PODCAST_TITLE/EPISODE_TWO_TITLE.mp3'
    };

    const savedEpisodeThree = {
        guid: 'GUID_THREE',
        title: 'EPISODE_THREE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'PODCAST_AUTHOR',
        description: 'DESCRIPTION_THREE',
        pubDate: '2019-01-03',
        duration: '24:00',
        category: 'PODCAST_CATEGORY',
        downloads: '0',
        url: 'URL_THREE',
        mp3Key: 'PODCAST_TITLE/EPISODE_THREE_TITLE.mp3'
    };

    // Setup mocks
    params.rssParser.getRssFeed.mockImplementation(() => Promise.reject(new Error('ERROR GETTING RSS FEED')));
    dao.getPodcast.mockImplementation(() => Promise.resolve(podcastDBEntries));
    dao.getEpisodes.mockImplementation(() => Promise.resolve(episodeDBEntries));
    podcastCreator.createPodcast.mockImplementation(() => Promise.resolve(savedPodcast));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeOne));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeTwo));
    podcastCreator.createEpisode.mockReturnValueOnce(Promise.resolve(savedEpisodeThree));

    // Test and assert
    return scraper.scrape(params)
        .catch((error) => {
            expect(error).toEqual(new Error('ERROR GETTING RSS FEED'));

            expect(params.rssParser.getRssFeed).toHaveBeenCalledTimes(1);
            expect(params.rssParser.getRssFeed).toHaveBeenCalledWith('RSS_URL', 3);
            expect(params.rssParser.getRssFeed).toHaveReturnedWith(Promise.reject(new Error('ERROR GETTING RSS FEED')));

            expect(dao.getPodcast).toHaveBeenCalledTimes(1);
            expect(dao.getPodcast).toHaveBeenCalledWith('PODCAST_TITLE', 'PODCAST_AUTHOR');
            expect(dao.getPodcast).toHaveReturnedWith(Promise.resolve(podcastDBEntries));

            expect(dao.getEpisodes).toHaveBeenCalledTimes(1);
            expect(dao.getEpisodes).toHaveBeenCalledWith('PODCAST_TITLE', 3);
            expect(dao.getEpisodes).toHaveReturnedWith(Promise.resolve(episodeDBEntries));

            expect(podcastCreator.createPodcast).toHaveBeenCalledTimes(0);
            expect(podcastCreator.createEpisode).toHaveBeenCalledTimes(0);
        });
});