/**
 * Created by Vittorio on 10/05/2016.
 */

var ml = require('../controllers/produtos_ml.server.controller.js');

module.exports = function(app) {

    app.route('/fetchml')
        .get(ml.curlFetch);
    
};