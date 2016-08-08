/**
 * Created by Vittorio on 10/05/2016.
 */
var config = require('./config');
var express = require('express');
var http = require('http');
var https = require('https');
var cors = require('cors');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var path = require('path');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var schedule = require('node-schedule');


module.exports = function() {

    var app = express();

    if(process.env.NODE_env === 'development') {
        app.use(morgan('dev'));
    } else if(process.env.NODE_env === 'production') {
        app.use(compress());
    }

    app.use(cors());
    app.use(flash());
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.get('/fetch', function (req, res) {
        var url = 'http://lista.mercadolivre.com.br/_CustId_93749855';
        var url2 = 'http://www.google.com';
        request(url, function (error, response, body) {
            if(!error && response.statusCode == 200) {
                res.send(body);
            }
        });
    });

    app.use(express.static('./public'));

    require('../app/routes/produtos_ml.server.routes.js')(app);
    require('../app/routes/vendedores_ml.server.routes')(app);

    var alow = require('../app/controllers/produtos_ml.server.controller');

    var rule = new schedule.RecurrenceRule();
    rule.second = 1;

    // var j = schedule.scheduleJob(rule, function(){ todo: Implantar o sistema para atualizar os dados diariamente.
    //     // alow.alow();
    //     var time = Date.now();
    //     console.log('Alow: ' + time);
    // });
    
    return app;

};