/**
 * Created by Vittorio on 10/05/2016.
 */
var Produtos = require('mongoose').model('ProdutoML');
var request = require('request');

var baseUrl = 'https://api.mercadolibre.com/items/';


function isDuplicate(err) {
    if(11000 === err.code || 11001 === err.code) {
        return true;
    }
    return false;
}

exports.update = function(req, res) {
    var produto = req.produto;
    produto.teste.push({sold: 25, data: Date.now()});
    produto.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        }
    });
};

exports.create = function(req, res) {
    var url = baseUrl + req.body.produtoId;
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
                });
            } else {
                res.json(produto);
            }
        });
    });
};

exports.list = function(req, res) {
    Produtos.find().exec(function (err, produtos) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produtos);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.produto);
};

exports.findById = function(req, res, next, id) {
    Produtos.findById(id).exec(function (err, produto) {
        if(err) return next(err);
        if(!produto) return next(new Error(`Failed to load produto id: ${id}`));
        req.produto = produto;
        next();
    });
};

exports.updateSoldQuantity = function(req, res, next, id) {
    var url = baseUrl + req.body.produtoId;
    request({
        method: 'GET',
        url: url,
        json: true
    }, function (err, response, body) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            Produtos.findById(id).exec(function (err, produto) {
                if(err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    produto.update({$push: {"teste": {data: Date.now(), sold: body.sold_quantity}}});
                }
            });
        }
    });

};

exports.fetch = function(req, res) {
    var xbaseUrl = 'http://lista.mercadolivre.com.br/_CustId_';
    var url = xbaseUrl + 93749855;
    url = 'https://api.mercadolibre.com/sites/MLA/search?seller_id=26997790';
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