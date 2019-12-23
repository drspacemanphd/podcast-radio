const dbClient = require('../../config/aws/awsconfig').dbClient;
const chai = require('chai');
const sinon = require('sinon');
const dao = require('../dao');

const expect = chai.expect;

describe('Dao', () => {

    describe('getPodcasts', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dbClient, 'scan');
        });

        afterEach(() => {
            stub.restore();
        });

        it('can be called to successfully get podcasts', () => {

            // Setup mocked response 
            const mockedResponse = {
                Items: [
                    {
                        "TITLE": "Caliphate",
                        "CATEGORY": "News",
                        "AUTHOR": "The New York Times",
                        "IMAGE_KEY": "caliphate/caliphate.jpg",
                        "IMAGE_URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/caliphate/caliphate.jpg"
                    },
                    {
                        "TITLE": "The NPR Politics Podcast",
                        "CATEGORY": "News",
                        "AUTHOR": "NPR",
                        "IMAGE_KEY": "npr-politics/npr-politics.jpg",
                        "IMAGE_URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/npr-politics/npr-politics.jpg"
                    }
                ]
            }
            
            stub.returns(
                {
                    promise: () => Promise.resolve(mockedResponse)
                }
            );

            return dao.getPodcasts()
                .then(result => {
                    expect(result).to.not.be.null;
                    expect(result).to.deep.equal(mockedResponse.Items);
                });
        });

        it('can handle thrown exception', () => {
            stub.returns(
                {
                    promise: () => Promise.reject(new Error('ERROR THROWN WHEN GETTING PODCASTS'))
                }
            );

            return dao.getPodcasts()
                .catch(error => {
                    expect(error).to.not.be.null;
                    expect(error.message).to.equal('ERROR THROWN WHEN GETTING PODCASTS');
                });
        });

    });

    describe('getPodcastsByCategory', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dbClient, 'query');
        });

        afterEach(() => {
            stub.restore();
        });

        it('can be called to successfully get podcasts by category', () => {

            // Setup mocked response 
            const mockedResponse = {
                Items: [
                    {
                        "TITLE": "Caliphate",
                        "CATEGORY": "News",
                        "AUTHOR": "The New York Times",
                        "IMAGE_KEY": "caliphate/caliphate.jpg",
                        "IMAGE_URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/caliphate/caliphate.jpg"
                    },
                    {
                        "TITLE": "The NPR Politics Podcast",
                        "CATEGORY": "News",
                        "AUTHOR": "NPR",
                        "IMAGE_KEY": "npr-politics/npr-politics.jpg",
                        "IMAGE_URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/npr-politics/npr-politics.jpg"
                    }
                ]
            }

            stub.returns(
                {
                    promise: () => Promise.resolve(mockedResponse)
                }
            );

            return dao.getPodcastsByCategory('NEWS')
                .then(result => {
                    expect(result).to.not.be.null;
                    expect(result).to.deep.equal(mockedResponse.Items);
                });
        });

        it('can handle thrown exception', () => {
            stub.returns(
                {
                    promise: () => Promise.reject(new Error('ERROR THROWN WHEN GETTING PODCASTS BY CATEGORY'))
                }
            );

            return dao.getPodcastsByCategory('NEWS')
                .catch(error => {
                    expect(error).to.not.be.null;
                    expect(error.message).to.equal('ERROR THROWN WHEN GETTING PODCASTS BY CATEGORY');
                });
        });

    });

    describe('getEpisodesByPodcastName', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dbClient, 'query');
        });

        afterEach(() => {
            stub.restore();
        });

        it('can be called to successfully get podcasts by category', () => {

            // Setup mocked response 
            const mockedResponse = {
                Items: [
                    {
                        "TITLE": "Year in Sound",
                        "MP3_KEY": "the-daily/Year in Sound.mp3",
                        "DESCRIPTION": "Our first episode of 2019 opened the year with a question: \"What will Democrats do with their new power?\" One of our last offered the answer: \"Impeach the president.\" This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit nytimes.com/thedaily. Here’s some nostalgia as we head into 2020:Our photo editors pored over ten years of images to bring you: The decade in pictures.And if you’re looking for a longer read over the holidays, check out our editors’ picks for the 10 best books of 2019.",
                        "CATEGORY": "News",
                        "PODCAST": "The Daily",
                        "PUBLICATION_DATE": "2019-12-23",
                        "DOWNLOADS": 0,
                        "GUID": "gid://art19-episode-locator/V0/uEQMwDBYOYJz-82T4MfWUp-ryIcxQ_cmkFQLMBQ8OHU",
                        "AUTHOR": "The New York Times",
                        "DURATION": "00:29:05",
                        "URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/the-daily/Year+in+Sound.mp3"
                    },
                    {
                        "TITLE": "The Candidates: Joe Biden",
                        "MP3_KEY": "the-daily/The Candidates: Joe Biden.mp3",
                        "DESCRIPTION": "He built a career, and a presidential campaign, on a belief in bipartisanship. Now, critics of the candidate ask: Is political consensus a dangerous compromise?  In Part 4 of our series on pivotal moments in the lives of the 2020 Democratic presidential contenders, we examine the long Senate career, and legislative legacy, of former Vice President Joseph R. Biden Jr. Guest: Astead W. Herndon, who covers national politics for The New York Times. For more information on today’s episode, visit nytimes.com/thedaily.  Background reading:Mr. Biden now plays down his role overhauling crime laws with segregationist senators in the 1980s and ’90s. In an investigation, our reporter found that the portrayal is at odds with his actions and rhetoric back then.The former vice president and current Democratic front-runner wants to unite the country in a divisive time. Here’s more on what Mr. Biden stands for.This Supreme Court battle explains why Mr. Biden firmly believes in bipartisanship.",
                        "CATEGORY": "News",
                        "PODCAST": "The Daily",
                        "PUBLICATION_DATE": "2019-12-20",
                        "DOWNLOADS": 0,
                        "GUID": "gid://art19-episode-locator/V0/WCgi8axavDpwAVmrTn_QSVX3IZDObjsN6wK0Om4gKk4",
                        "AUTHOR": "The New York Times",
                        "DURATION": "00:40:36",
                        "URL": "https://podcast-radio-mobile-dev.s3.amazonaws.com/public/the-daily/The+Candidates%3A+Joe+Biden.mp3"
                    }
                ]
            }

            stub.returns(
                {
                    promise: () => Promise.resolve(mockedResponse)
                }
            );

            return dao.getEpisodesByPodcastName('The Daily')
                .then(result => {
                    expect(result).to.not.be.null;
                    expect(result).to.deep.equal(mockedResponse.Items);
                });
        });

        it('can handle thrown exception', () => {
            stub.returns(
                {
                    promise: () => Promise.reject(new Error('ERROR THROWN WHEN GETTING EPISODES BY PODCAST'))
                }
            );

            return dao.getEpisodesByPodcastName('The Daily')
                .catch(error => {
                    expect(error).to.not.be.null;
                    expect(error.message).to.equal('ERROR THROWN WHEN GETTING EPISODES BY PODCAST');
                });
        });

    });

});