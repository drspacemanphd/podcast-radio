const express = require('express');
const HttpResponseBuilder = require('common-config/src/common-model/HttpResponse');
const service = require('./Service');
const logger = require('./ApiLogger');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger.log);

app.get('/podcast/all', (req, res) => {
    service.getPodcasts()
        .then(result => {
            response = new HttpResponseBuilder()
                .url(req.url)
                .status(200)
                .payload(result)
                .timestamp(new Date())
                .build();

            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500)
            res.json({
                status: 500,
                message: err
            });
        });
});

app.post('/podcast/category', (req, res) => {
    service.getPodcastsByCategory(req.body.podcastCategory)
        .then(result => {
            response = new HttpResponseBuilder()
                .url(req.url)
                .status(200)
                .payload(result)
                .timestamp(new Date())
                .build();

            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500)
            res.json({
                status: 500,
                message: err
            });
        });
})

app.get('/podcast/:podcast/episodes', (req, res) => {
    service.getEpisodesByPodcastName(req.params.podcast)
        .then(result => {
            response = new HttpResponseBuilder()
                .url(req.url)
                .status(200)
                .payload(result)
                .timestamp(new Date())
                .build();

            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500)
            res.json({
                status: 500,
                message: err
            });
        });
});

app.listen(p = 3000, () => {
    console.log('Listening to port: ' + p);
});

module.exports = app;
