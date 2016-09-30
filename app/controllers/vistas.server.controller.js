/**
 * Created by Vittorio on 28/09/2016.
 */
var Vistas = require('mongoose').model('Vista');

exports.create = function(req, res) {
    var vista = new Vistas(req.body);
    vista.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(vista);
        }
    });
};

exports.list = function(req, res) {
    Vistas.find().populate('produtos_vista').exec(function (err, vistas) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(vistas);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.vista);
};

exports.findById = function(req, res, next, id) {
    Vistas.findById(id).populate('produtos_vista').exec(function (err, vista) {
        if(err) return next(err);
        if(!vista) return next(new Error(`Não foi possível encontrar a Vista id: ${id}`));
        req.vista = vista;
        next();
    });
};

exports.update = function(req, res) {
    var vista = req.vista;
    vista.nome_vista = req.body.nome_vista;
    vista.descricao_vista = req.body.descricao_vista;
    vista.produtos_vista = req.body.produtos_vista;
    vista.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(vista);
        }
    });
};

exports.delete = function(req, res) {
    var vista = req.vista;
    vista.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(vista);
        }
    });
};