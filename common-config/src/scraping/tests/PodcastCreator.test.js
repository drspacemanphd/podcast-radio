const podcastCreator = require('../PodcastCreator');
const dbDao = require('../PodcastDBDao');
const s3Dao = require('../PodcastS3Dao');

// Setup mocks
jest.mock('../PodcastDBDao.js', () => {
    return {
        savePodcast: jest.fn(),
        saveEpisode: jest.fn()
    };
});

jest.mock('../PodcastS3Dao.js', () => {
    return {
        savePodcastImage: jest.fn(),
        saveEpisodeMp3: jest.fn()
    };
});

beforeEach(() => {
    dbDao.savePodcast.mockReset();
    dbDao.saveEpisode.mockReset();
    s3Dao.savePodcastImage.mockReset();
    s3Dao.saveEpisodeMp3.mockReset();
});

test('test that podcast with specified image can be saved', () => {

    // Mock setup data
    let rssFeed = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'IMAGE_URL',
    };
    let dns = 'podcast-name';
    let savedImage = { Location: 'LOCATION' };

    // Mock expected returned data
    const savedPodcast = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'LOCATION',
        imageKey: 'podcast-name/podcast-name.jpg'
    };

    // Mock fxn implementations
    s3Dao.savePodcastImage.mockImplementation((url, imageKey) => Promise.resolve(savedImage));
    dbDao.savePodcast.mockImplementation(podcast => Promise.resolve(podcast));

    // Test function
    return podcastCreator.createPodcast(rssFeed, dns)
        .then(data => {
            expect(data).toEqual(savedPodcast);
            expect(s3Dao.savePodcastImage.mock.calls.length).toBe(1);
            expect(dbDao.savePodcast.mock.calls.length).toBe(1);
        });

});

test('test that podcast without can be still be saved', () => {

    // Mock setup data
    let rssFeed = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
    };
    let dns = 'podcast-name';

    // Mock expected returned data
    const savedPodcast = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
    };

    // Mock fxn implementations
    s3Dao.savePodcastImage.mockImplementation((url, imageKey) => Promise.resolve(savedImage));
    dbDao.savePodcast.mockImplementation(podcast => Promise.resolve(podcast));

    // Test function
    return podcastCreator.createPodcast(rssFeed, dns)
        .then(data => {
            expect(data).toEqual(savedPodcast);
            expect(s3Dao.savePodcastImage.mock.calls.length).toBe(0);
            expect(dbDao.savePodcast.mock.calls.length).toBe(1);
        });

});

test('test that process is exited when exception is thrown when saving the podcast image', () => {

    // Mock setup data
    let rssFeed = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'IMAGE_URL',
    };
    let dns = 'podcast-name';
    let savedImage = { Location: 'LOCATION' };

    // Mock fxn implementations
    s3Dao.savePodcastImage.mockImplementation((url, imageKey) => Promise.reject(new Error('AN S3 ERROR')));
    dbDao.savePodcast.mockImplementation(podcast => Promise.resolve(podcast));

    // Test function
    return podcastCreator.createPodcast(rssFeed, dns)
        .catch(error => {
            expect(error).toEqual(new Error('AN S3 ERROR'));
            expect(s3Dao.savePodcastImage.mock.calls.length).toBe(1);
            expect(dbDao.savePodcast.mock.calls.length).toBe(0);
        });

});

test('test that process is exited when exception is thrown when saving the podcast db entry', () => {

    // Mock setup data
    let rssFeed = {
        title: 'TITLE',
        author: 'AUTHOR',
        category: 'CATEGORY',
        imageUrl: 'IMAGE_URL',
    };
    let dns = 'podcast-name';
    let savedImage = { Location: 'LOCATION' };

    // Mock fxn implementations
    s3Dao.savePodcastImage.mockImplementation((url, imageKey) => Promise.resolve(savedImage));
    dbDao.savePodcast.mockImplementation(podcast => Promise.reject(new Error("A DB ERROR")));

    // Test function
    return podcastCreator.createPodcast(rssFeed, dns)
        .catch(error => {
            expect(error).toEqual(new Error('A DB ERROR'));
            expect(s3Dao.savePodcastImage.mock.calls.length).toBe(1);
            expect(dbDao.savePodcast.mock.calls.length).toBe(1);
        });

});

test('test that podcast episode can be saved', () => {

    // Mock setup data
    let podcast = {
        title: 'PODCAST_TITLE',
        category: 'CATEGORY'
    }
    
    let episode = {
        guid: 'EPISODE_ID',
        title: 'EPISODE_TITLE',
        author: 'EPISODE_AUTHOR',
        description: 'EPISODE_DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'MP3_LOCATION'
    }

    let dns = 'podcast-name';
    let savedMP3 = { Location: 'SAVED_LOCATION' };

    // Setup expectedData
    let expectedData = {
        guid: 'EPISODE_ID',
        title: 'EPISODE_TITLE',
        podcast: 'PODCAST_TITLE',
        author: 'EPISODE_AUTHOR',
        description: 'EPISODE_DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        category: 'CATEGORY',
        downloads: '0',
        url: 'SAVED_LOCATION',
        mp3Key: 'podcast-name/EPISODE_TITLE.mp3'
    }

    // Mock functions
    s3Dao.saveEpisodeMp3.mockImplementation((url, mp3Key) => Promise.resolve(savedMP3));
    dbDao.saveEpisode.mockImplementation(entry => Promise.resolve(entry));

    // Test and assert
    podcastCreator.createEpisode(podcast, episode, dns)
        .then(data => {
            expect(data).toEqual(expectedData);
            expect(s3Dao.saveEpisodeMp3.mock.calls.length).toBe(1);
            expect(dbDao.saveEpisode.mock.calls.length).toBe(1);
        });

});

test('test that process aborted when error is thrown saving mp3', () => {

    // Mock setup data
    let podcast = {
        title: 'PODCAST_TITLE',
        category: 'CATEGORY'
    }

    let episode = {
        guid: 'EPISODE_ID',
        title: 'EPISODE_TITLE',
        author: 'EPISODE_AUTHOR',
        description: 'EPISODE_DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'MP3_LOCATION'
    }

    let dns = 'podcast-name';

    // Mock functions
    s3Dao.saveEpisodeMp3.mockImplementation((url, mp3Key) => Promise.reject(new Error('ERROR SAVING MP3')));
    dbDao.saveEpisode.mockImplementation(entry => Promise.resolve(entry));

    // Test and assert
    podcastCreator.createEpisode(podcast, episode, dns)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR SAVING MP3'));
            expect(s3Dao.saveEpisodeMp3.mock.calls.length).toBe(1);
            expect(dbDao.saveEpisode.mock.calls.length).toBe(0);
        });

});

test('test that process aborted when error is thrown saving db entry', () => {

    // Mock setup data
    let podcast = {
        title: 'PODCAST_TITLE',
        category: 'CATEGORY'
    }

    let episode = {
        guid: 'EPISODE_ID',
        title: 'EPISODE_TITLE',
        author: 'EPISODE_AUTHOR',
        description: 'EPISODE_DESCRIPTION',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'MP3_LOCATION'
    }

    let dns = 'podcast-name';
    let savedMP3 = { Location: 'SAVED_LOCATION' };

    // Mock functions
    s3Dao.saveEpisodeMp3.mockImplementation((url, mp3Key) => Promise.resolve(savedMP3));
    dbDao.saveEpisode.mockImplementation(entry => Promise.reject(new Error('ERROR SAVING DB ENTRY')));

    // Test and assert
    podcastCreator.createEpisode(podcast, episode, dns)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR SAVING DB ENTRY'));
            expect(s3Dao.saveEpisodeMp3.mock.calls.length).toBe(1);
            expect(dbDao.saveEpisode.mock.calls.length).toBe(1);
        });

});