let express = require('express');
let app = express();
let axios = require('axios');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/items', function(req, res) {
    url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
    axios.get(url + req.query.search)
        .then(function(result) {
            console.log('res', result.data);
            if(result.data.paging.total > 0)
                res.send(result.data.results);
            else
                res.send('No records found');
        })
        .catch(function(err) {
            console.log('err', err);
        });
});

app.get('/api/items/:id', function(req, res) {
    url = 'https://api.mercadolibre.com/items/';
    axios.get(url + req.params.id)
        .then(function(result) {
            console.log('res', result.data);
            res.send(result.data);
        })
        .catch(function(err) {
            console.log('err', err);
        });
});

app.get('/api/items/:id/description', function(req, res) {
    url = 'https://api.mercadolibre.com/items/';
    axios.get(url + req.params.id + '/description')
        .then(function(result) {
            console.log('res', result.data);
            res.send(result.data);
        })
        .catch(function(err) {
            console.log('err', err);
        });
});


app.listen(3030, function () {
  console.log('ok');
});