/**
 * Created by Vittorio on 12/05/2016.
 */
var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose conencted at ${config.db}`);
    });

    mongoose.connection.on('error', function () {
        console.log(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', function() {
        console.log(`Mongoose disconnected`);
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(`Mongoose disconnected through app termination`);
            process.exit(0);
        });
    });

    require('../app/models/produtos_ml.server.model');
    require('../app/models/vendedores_ml.server.model');
    
    return db;
    
};