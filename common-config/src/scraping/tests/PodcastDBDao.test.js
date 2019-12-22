const dao = require('../PodcastDBDao');
const config = require('../../aws/awsconfig');

jest.mock('../../aws/awsconfig', () => {
    return {
        db: {
            query: jest.fn(),
            putItem: jest.fn()
        }
    }
});

beforeEach(() => {
    config.db.query.mockReset();
    config.db.putItem.mockReset();
});

test('test that podcast entry can be queried', () => {

    // Setup data
    let podcastTitle = 'PODCAST_TITLE';
    let podcastAuthor = 'PODCAST_AUTHOR';

    // Setup expected data
    const params = {
        ExpressionAttributeValues: {
            ':p': { 'S': 'PODCAST_TITLE' },
            ':a': { 'S': 'PODCAST_AUTHOR' }
        },
        KeyConditionExpression: 'TITLE = :p AND AUTHOR = :a',
        TableName: process.env.PODCAST_TABLE
    }

    const expected = { 
        TITLE: 'PODCAST_TITLE',
        AUTHOR: 'PODCAST_AUTHOR',
        CATEGORY: 'PODCAST_CATEGORY',
        IMAGE_URL: 'IMAGE_URL',
        IMAMGE_KEY: 'IMAGE_KEY'
    };

    // Mock fxns
    config.db.query.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.resolve({ Items: [expected]}))
        }
    });

    // Test and assert
    return dao.getPodcast(podcastTitle, podcastAuthor)
        .then(data => {
            expect(data).toEqual([expected]);
            expect(config.db.query).toHaveBeenCalledTimes(1);
            expect(config.db.query).toHaveBeenCalledWith(params);
        });

});

test('test that process is aborted if error occurs when podcast is queried', () => {

    // Setup data
    let podcastTitle = 'PODCAST_TITLE';
    let podcastAuthor = 'PODCAST_AUTHOR';

    // Setup expected return
    const params = {
        ExpressionAttributeValues: {
            ':p': { 'S': 'PODCAST_TITLE' },
            ':a': { 'S': 'PODCAST_AUTHOR' }
        },
        KeyConditionExpression: 'TITLE = :p AND AUTHOR = :a',
        TableName: process.env.PODCAST_TABLE
    }

    const expected = {
        TITLE: 'PODCAST_TITLE',
        AUTHOR: 'PODCAST_AUTHOR',
        CATEGORY: 'PODCAST_CATEGORY',
        IMAGE_URL: 'IMAGE_URL',
        IMAMGE_KEY: 'IMAGE_KEY'
    };

    // Mock fxns
    config.db.query.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.reject(new Error('ERROR WHEN QUERYING PODCAST')))
        }
    });

    // Test and assert
    return dao.getPodcast(podcastTitle, podcastAuthor)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR WHEN QUERYING PODCAST'));
            expect(config.db.query).toHaveBeenCalledTimes(1);
            expect(config.db.query).toHaveBeenCalledWith(params);
        });

});

test('test that episode entries can be queried', () => {

    // Setup data
    let podcastTitle = 'PODCAST_TITLE';
    let lookback = 3;

    // Setup expected return
    const params = {
        ExpressionAttributeValues: {
            ':p': { 'S': 'PODCAST_TITLE' }
        },
        TableName: process.env.EPISODE_TABLE,
        IndexName: 'PUBLICATION_INDEX',
        KeyConditionExpression: 'PODCAST = :p',
        ScanIndexForward: false,
        Limit: lookback
    }

    const expected = {
        GUID: 'GUID',
        TITLE: 'EPISODE_TITLE',
        PODCAST: 'PODCAST_TITLE',
        AUTHOR: 'EPISODE_AUTHOR',
        CATEGORY: 'PODCAST_CATEGORY',
        DURATION: '20:00',
        PUBLICATION_DATE: '2019-01-01',
        DOWNLOADS: 1,
        MP3_URL: 'MP3_URL',
        MP3_KEY: 'MP3_KEY'
    };

    // Mock fxns
    config.db.query.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.resolve({ Items: [expected] }))
        }
    });

    // Test and assert
    return dao.getEpisodes(podcastTitle, lookback)
        .then(data => {
            expect(data).toEqual([expected]);
            expect(config.db.query).toHaveBeenCalledTimes(1);
            expect(config.db.query).toHaveBeenCalledWith(params);
        });

});

test('test that process is aborted if error occurs when podcast is queried', () => {

    // Setup data
    let podcastTitle = 'PODCAST_TITLE';
    let lookback = 3;

    // Setup expected return
    const params = {
        ExpressionAttributeValues: {
            ':p': { 'S': 'PODCAST_TITLE' }
        },
        TableName: process.env.EPISODE_TABLE,
        IndexName: 'PUBLICATION_INDEX',
        KeyConditionExpression: 'PODCAST = :p',
        ScanIndexForward: false,
        Limit: lookback
    }

    const expected = {
        GUID: 'GUID',
        TITLE: 'EPISODE_TITLE',
        PODCAST: 'PODCAST_TITLE',
        AUTHOR: 'EPISODE_AUTHOR',
        CATEGORY: 'PODCAST_CATEGORY',
        DURATION: '20:00',
        PUBLICATION_DATE: '2019-01-01',
        DOWNLOADS: 1,
        MP3_URL: 'MP3_URL',
        MP3_KEY: 'MP3_KEY'
    };

    // Mock fxns
    config.db.query.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.reject(new Error('ERROR WHEN QUERYING EPISODES')))
        }
    });

    // Test and assert
    return dao.getEpisodes(podcastTitle, lookback)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR WHEN QUERYING EPISODES'));
            expect(config.db.query).toHaveBeenCalledTimes(1);
            expect(config.db.query).toHaveBeenCalledWith(params);
            expect
        });

});

test('test that podcast entry can be saved', () => {

    // Setup data
    const podcast = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    }

    const params = {
        TableName: process.env.PODCAST_TABLE,
        Item: {
            'TITLE': { 'S': podcast.title },
            'AUTHOR': { 'S': podcast.author },
            'CATEGORY': { 'S': podcast.category },
            'IMAGE_URL': { 'S': podcast.imageUrl },
            'IMAGE_KEY': { 'S': podcast.imageKey }
        }
    }

    // Mock fxns
    config.db.putItem.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.resolve({ Items: [] }))
        }
    });

    // Test and assert
    return dao.savePodcast(podcast)
        .then(data => {
            expect(data).toEqual(podcast);
            expect(config.db.putItem).toHaveBeenCalledTimes(1);
            expect(config.db.putItem).toHaveBeenCalledWith(params);
        });

});

test('test that process is aborted if error occurs when podcast is saved', () => {

    // Setup data
    const podcast = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'IMAGE_URL',
        imageKey: 'IMAGE_KEY'
    }

    const params = {
        TableName: process.env.PODCAST_TABLE,
        Item: {
            'TITLE': { 'S': podcast.title },
            'AUTHOR': { 'S': podcast.author },
            'CATEGORY': { 'S': podcast.category },
            'IMAGE_URL': { 'S': podcast.imageUrl },
            'IMAGE_KEY': { 'S': podcast.imageKey }
        }
    }

    // Mock fxns
    config.db.putItem.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.reject(new Error('ERROR WHEN SAVING PODCAST')))
        }
    });

    // Test and assert
    return dao.savePodcast(podcast)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR WHEN SAVING PODCAST'));
            expect(config.db.putItem).toHaveBeenCalledTimes(1);
            expect(config.db.putItem).toHaveBeenCalledWith(params);
        });

});

test('test that an episode entry can be saved', () => {

    // Setup data
    const episode = {
        guid: 'GUID',
        title: 'TITLE',
        podcast: 'PODCAST',
        author: 'AUTHOR',
        description: 'DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'CATEGORY',
        downloads: '0',
        url: 'URL',
        mp3Key: 'MP3_KEY'
    }

    const params = {
        TableName: process.env.EPISODE_TABLE,
        Item: {
            'GUID': { 'S': episode.guid },
            'TITLE': { 'S': episode.title },
            'PODCAST': { 'S': episode.podcast },
            'AUTHOR': { 'S': episode.author },
            'DESCRIPTION': { 'S': episode.description },
            'PUBLICATION_DATE': { 'S': episode.pubDate },
            'DURATION': { 'S': episode.duration },
            'CATEGORY': { 'S': episode.category },
            'DOWNLOADS': { 'N': episode.downloads },
            'URL': { 'S': episode.url },
            'MP3_KEY': { 'S': episode.mp3Key }
        }
    }

    // Mock fxns
    config.db.putItem.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.resolve({ Items: [] }))
        }
    });

    // Test and assert
    return dao.saveEpisode(episode)
        .then(data => {
            expect(data).toEqual(episode);
            expect(config.db.putItem).toHaveBeenCalledTimes(1);
            expect(config.db.putItem).toHaveBeenCalledWith(params);
        });

});

test('test that process is aborted if error is thrown when saving an episode', () => {

    // Setup data
    const episode = {
        guid: 'GUID',
        title: 'TITLE',
        podcast: 'PODCAST',
        author: 'AUTHOR',
        description: 'DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'CATEGORY',
        downloads: '0',
        url: 'URL',
        mp3Key: 'MP3_KEY'
    }

    const params = {
        TableName: process.env.EPISODE_TABLE,
        Item: {
            'GUID': { 'S': episode.guid },
            'TITLE': { 'S': episode.title },
            'PODCAST': { 'S': episode.podcast },
            'AUTHOR': { 'S': episode.author },
            'DESCRIPTION': { 'S': episode.description },
            'PUBLICATION_DATE': { 'S': episode.pubDate },
            'DURATION': { 'S': episode.duration },
            'CATEGORY': { 'S': episode.category },
            'DOWNLOADS': { 'N': episode.downloads },
            'URL': { 'S': episode.url },
            'MP3_KEY': { 'S': episode.mp3Key }
        }
    }

    // Mock fxns
    config.db.putItem.mockImplementation((params) => {
        return {
            promise: jest.fn(() => Promise.reject(new Error('ERROR WHEN SAVING EPISODE')))
        }
    });

    // Test and assert
    return dao.saveEpisode(episode)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR WHEN SAVING EPISODE'));
            expect(config.db.putItem).toHaveBeenCalledTimes(1);
            expect(config.db.putItem).toHaveBeenCalledWith(params);
        });

});