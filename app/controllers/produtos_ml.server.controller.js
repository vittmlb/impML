/**
 * Created by Vittorio on 10/05/2016.
 */
var Produtos = require('mongoose').model('ProdutoML');
var request = require('request');

var baseUrl = 'https://api.mercadolibre.com/items/';

exports.update = function(req, res) {
    var produto = req.produto;
    produto.historico.push({sold: req.produto.sold_quantity, data: Date.now()});
    produto.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produto);
        }
    });
};

exports.create = function(req, res) {

    var produtoId = req.body.produtoId;
    if (produtoId.length > 13) {
        var m = extraiIdProduto(produtoId);
        produtoId = m[0].replace('-', '');
    }

    var url = baseUrl + produtoId;
    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, response, body) {
        var produto = new Produtos(body);
        produto.historico.push({data: Date.now(), venda: body.sold_quantity});
        produto.save(function (err) {
            if(err) {
                return res.status(400).send({
                    message: err.message
                });
            } else {
                res.json(produto);
            }
        });
    });
};

exports.delete = function(req, res) {
    var produto = req.produto;
    produto.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produto);
        }
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

exports.updateSoldQuantity = function(req, res, next) {
    var url = baseUrl + req.produto.id;
    var produto = req.produto;
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
            if(produto.historico.length > 0) {
                body.venda_da_data = 0;
            } else {
                body.venda_da_data = body.sold_quantity - produto.historico[produto.historico.length - 1].venda;
            }
            produto.historico.push({data: Date.now(), venda: body.sold_quantity, venda_da_data: body.venda_da_data });
            produto.save(function (err) {
                if(err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    res.json(produto);
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

exports.scheduledJobAtualizaProdutos = function() {
    Produtos.find().exec(function (err, produtos) {
        produtos.forEach(function (produto) {
            updateSoldQuantityForJobs(produto);
        });
    });
};

function updateSoldQuantityForJobs(produtoParaUpdate) {
    var url = baseUrl + produtoParaUpdate.id;
    var produto = produtoParaUpdate;
    request({
        method: 'GET',
        url: url,
        json: true
    }, function (err, response, body) {
        if(err) {
            console.log(err);
        } else {
            if(produto.historico.length > 0) {
                body.venda_da_data = 0;
            } else {
                body.venda_da_data = body.sold_quantity - produto.historico[produto.historico.length - 1].venda;
            }
            produto.historico.push({data: Date.now(), venda: body.sold_quantity, venda_da_data: body.venda_da_data });
            produto.save(function (err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(`Produto id: ${produto._id} atualizado corretamente.`);
                }
            });
        }
    });
}

function extraiIdProduto(str) {
    var re = /MLB-\d{9}/;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
    }

    return m;

}

exports.teste = function() {
    console.log('Testando!!!');
};