const app = require('./src/api/api').standalone;
app.listen(p = 3000, () => {
    console.log('Listening to port: ' + p);
});