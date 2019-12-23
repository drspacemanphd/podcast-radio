const dao = require('../PodcastS3Dao');
const fetch = require('node-fetch');
const config = require('../../aws/awsconfig');

jest.mock('node-fetch', () => jest.fn());
jest.mock('../../aws/awsconfig', () => {
    return {
        s3: {
            upload: jest.fn()
        }
    }
});

beforeEach(() => {
    fetch.mockReset();
    config.s3.upload.mockReset();
});

test('test that image can be successfully saved', () => {

    // Setup data
    let url = 'URL';
    let imageKey = 'IMAGE_KEY';

    // Setup expected return
    let expected = { Location: 'IMAGE_LOCATION' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.resolve('body')
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.resolve(expected)
        }
    });

    // Test and assert
    return dao.savePodcastImage(url, imageKey)
        .then(data => {
            expect(data).toEqual(expected);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(1);
        });

});

test('test that process is aborted if error is thrown when saving image', () => {

    // Setup data
    let url = 'URL';
    let imageKey = 'IMAGE_KEY';

    // Setup expected return
    let expected = { Location: 'IMAGE_LOCATION' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.resolve('body')
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.reject(new Error('ERROR THROWN WHEN SAVING IMAGE'))
        }
    });

    // Test and assert
    return dao.savePodcastImage(url, imageKey)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN SAVING IMAGE'));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(1);
        })

});

test('test that process is aborted if error is thrown when fetching image', () => {

    // Setup data
    let url = 'URL';
    let imageKey = 'IMAGE_KEY';

    // Setup expected return
    let expected = { Location: 'IMAGE_LOCATION' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.reject(new Error('ERROR THROWN WHEN FETCHING IMAGE'))
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.resolve(expected)
        }
    });

    // Test and assert
    return dao.savePodcastImage(url, imageKey)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN FETCHING IMAGE'));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(0);
        })

});

test('test that mp3 can be successfully saved', () => {

    // Setup data
    let url = 'URL';
    let mp3Key = 'MP3_KEY';

    // Setup expected return
    let expected = { Location: 'MP3_LOCATION' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.resolve('body')
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.resolve(expected)
        }
    });

    // Test and assert
    return dao.saveEpisodeMp3(url, mp3Key)
        .then(data => {
            expect(data).toEqual(expected);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(1);
        });

});

test('test that process is aborted if error is thrown when saving mp3', () => {

    // Setup data
    let url = 'URL';
    let mp3Key = 'MP3_KEY';

    // Setup expected return
    let expected = { Location: 'MP3_KEY' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.resolve('body')
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.reject(new Error('ERROR THROWN WHEN SAVING MP3'))
        }
    });

    // Test and assert
    return dao.saveEpisodeMp3(url, mp3Key)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN SAVING MP3'));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(1);
        });

});

test('test that process is aborted if error is thrown when fetching mp3', () => {

    // Setup data
    let url = 'URL';
    let mp3Key = 'MP3_KEY';

    // Setup expected return
    let expected = { Location: 'MP3_LOCATION' };

    // Mock fxns
    fetch.mockImplementation(() => Promise.resolve(
        {
            buffer: () => Promise.reject(new Error('ERROR THROWN WHEN FETCHING MP3'))
        }
    ));

    config.s3.upload.mockImplementation(() => {
        return {
            promise: () => Promise.resolve(expected)
        }
    });

    // Test and assert
    return dao.saveEpisodeMp3(url, mp3Key)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN FETCHING MP3'));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(config.s3.upload).toHaveBeenCalledTimes(0);
        });

});