/**
 * Created by Vittorio on 10/05/2016.
 */
var Produtos = require('mongoose').model('ProdutoML');
var request = require('request');

exports.fetch = function(req, res) {
    var baseUrl = 'http://lista.mercadolivre.com.br/_CustId_';
    var url = baseUrl + 93749855;
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            // var $ = cheerio.load(body);
            //var searchResults = $('#searchResults');
            res.send(body);
        }
    });
};

exports.curlFetch = function(req, res) {

    var url = 'https://api.mercadolibre.com/items/MLB714405813';

    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, response, body) {
        var produto = new Produtos(body);
        produto.save(function (err) {
            if(err) {
                return res.status(400).send({
                    message: err
                })
            } else {
                res.json(produto);
            }
        });
    });


};