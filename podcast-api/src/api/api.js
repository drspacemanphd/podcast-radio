process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();

const express = require('express');
const HttpResponseBuilder = require('common-config/src/common-model/HttpResponse');
const dao = require('../dao/dao');
const logger = require('../config/logger/ApiLogger');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger.log);

app.get('/podcast/all', async (req, res) => {
    try {
        let result = await dao.getPodcasts();
        res.json(buildResponse(req, result));
    } catch (err) {
        console.log(err.message);
        res.status(500);
        res.json(buildError(req, err.message));
    }
});

app.post('/podcast/category', async (req, res) => {
    try {
        let result = await dao.getPodcastsByCategory(req.body.podcastCategory);
        res.json(buildResponse(req, result));
    } catch (err) {
        console.log(err.message);
        res.status(500);
        res.json(buildError(req, err.message));
    }
});

app.get('/podcast/:podcast/episodes', async (req, res) => {
    try {
        let result = await dao.getEpisodesByPodcastName(req.params.podcast);
        res.json(buildResponse(req, result));
    } catch (err) {
        console.log(err.message);
        res.status(500);
        res.json(buildError(req, err.message));
    }
});

const buildResponse = (req, data) => {
    return new HttpResponseBuilder()
        .url(req.url)
        .status(200)
        .payload(data)
        .timestamp(new Date())
        .build();
}

const buildError = (req, errMessage) => ({
    url: req.url,
    status: 500,
    timestamp: new Date(),
    message: errMessage
});

module.exports = {
    standalone: app
}
