const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');

const api = require('../api').standalone;
const dao = require('../../dao/dao');

// Setup Mopdules for tests
chai.use(chaiHttp);

// Setup log suppresser for successful tests
const logger = console.log;
let output;
beforeEach(function (done) {
    output = '';
    console.log = (msg) => {
        output += msg + '\n';
    };
    done();
});
afterEach(function (done) {
    console.log = logger; // undo dummy log function
    if (this.currentTest.state === 'failed') {
        console.log(output);
    }
    done();
});

describe('Api', () => {

    describe('getPodcast', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dao, 'getPodcasts');
        });

        afterEach(() => {
            stub.restore();
        });

        it('should be able to return a list of podcasts', () => {

            // Setup mocked response 
            const mockedResponse = [
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
            ];

            // Setup Mock
            stub.withArgs().returns(Promise.resolve(mockedResponse));

            return chai.request(api)
                .get('/podcast/all')
                .send()
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith()).to.be.true;
                    expect(stub.returned(Promise.resolve(mockedResponse))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(200);
                    expect(res).to.have.property('statusCode', 200);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/all');
                    expect(body).to.have.property('timestamp');
                    expect(body).to.have.deep.property('payload', mockedResponse);
                }, err => {
                    console.log(err);
                });
            
        });

        it('should be able to return a 500 response for an error', () => {

            // Setup Mock
            stub.withArgs().returns(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING PODCASTS')));

            return chai.request(api)
                .get('/podcast/all')
                .send()
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith()).to.be.true;
                    expect(stub.returned(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING PODCASTS')))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(500);
                    expect(res).to.have.property('statusCode', 500);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/all');
                    expect(body).to.have.property('status', 500);
                    expect(body).to.have.property('timestamp');

                    expect(body).not.to.have.deep.property('payload');
                    expect(body).to.have.property('message', 'ERROR OCCURRED WHEN GETTING PODCASTS');
                }, err => {
                    console.log(err);
                });

        });

    });

    describe('getPodcastsFromCategory', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dao, 'getPodcastsByCategory');
        });

        afterEach(() => {
            stub.restore();
        });

        it('should be able to return a list of podcasts by category', () => {

            // Setup mocked response 
            const mockedResponse = [
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
            ];

            // Setup mock
            stub.withArgs('NEWS').returns(Promise.resolve(mockedResponse));

            return chai.request(api)
                .post('/podcast/category')
                .send({ podcastCategory: 'NEWS' })
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith('NEWS')).to.be.true;
                    expect(stub.calledWith('ARTS')).to.be.false;
                    expect(stub.returned(Promise.resolve(mockedResponse))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(200);
                    expect(res).to.have.property('statusCode', 200);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/category');
                    expect(body).to.have.property('timestamp');
                    expect(body).to.have.deep.property('payload', mockedResponse);

                    stub.restore();
                }, err => {
                    console.log(err);
                });

        });

        it('should be able to return a 500 response for an error', () => {

            // Setup mock
            stub.withArgs('NEWS').returns(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING PODCASTS BY CATEGORY')));

            return chai.request(api)
                .post('/podcast/category')
                .send({ podcastCategory: 'NEWS' })
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith('NEWS')).to.be.true;
                    expect(stub.calledWith('ARTS')).to.be.false;
                    expect(stub.returned(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING PODCASTS BY CATEGORY')))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(500);
                    expect(res).to.have.property('statusCode', 500);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/category');
                    expect(body).to.have.property('status', 500);
                    expect(body).to.have.property('timestamp');

                    expect(body).not.to.have.deep.property('payload');
                    expect(body).to.have.property('message', 'ERROR OCCURRED WHEN GETTING PODCASTS BY CATEGORY');

                    stub.restore();
                }, err => {
                    console.log(err);
                });

        });

    });

    describe('getEpisodesByPodcastName', () => {

        let stub;

        beforeEach(() => {
            stub = sinon.stub(dao, 'getEpisodesByPodcastName');
        });

        afterEach(() => {
            stub.restore();
        });

        it('should be able to return a list of episodes by podcast', () => {

            // Setup mocked response 
            const mockedResponse = [
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
            ];

            // Setup mock
            stub.withArgs().returns(Promise.resolve(mockedResponse));

            return chai.request(api)
                .get('/podcast/The%20Daily/episodes')
                .send()
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith()).to.be.true;
                    expect(stub.calledWith('string')).to.be.false;
                    expect(stub.returned(Promise.resolve(mockedResponse))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(200);
                    expect(res).to.have.property('statusCode', 200);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/The%20Daily/episodes');
                    expect(body).to.have.property('timestamp');
                    expect(body).to.have.deep.property('payload', mockedResponse);
                }, err => {
                    console.log(err);
                });

        });

        it('should be able to return a 500 response for an error', () => {

            // Setup mock
            stub.withArgs().returns(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING EPISODES BY PODCAST')));

            return chai.request(api)
                .get('/podcast/The%20Daily/episodes')
                .send()
                .then(res => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.calledWith()).to.be.true;
                    expect(stub.calledWith('ARTS')).to.be.false;
                    expect(stub.returned(Promise.reject(new Error('ERROR OCCURRED WHEN GETTING EPISODES BY PODCAST')))).to.be.true;
                    expect(stub.returned({})).to.be.false;

                    expect(res).to.have.status(500);
                    expect(res).to.have.property('statusCode', 500);
                    expect(res).to.have.property('body');

                    const body = res.body;
                    expect(body).to.have.property('url', '/podcast/The%20Daily/episodes');
                    expect(body).to.have.property('status', 500);
                    expect(body).to.have.property('timestamp');

                    expect(body).not.to.have.deep.property('payload');
                    expect(body).to.have.property('message', 'ERROR OCCURRED WHEN GETTING EPISODES BY PODCAST');
                }, err => {
                    console.log(err);
                });

        });

    });

});