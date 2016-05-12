/**
 * Created by Vittorio on 10/05/2016.
 */

var ml = require('../controllers/ml.server.controller');

module.exports = function(app) {

    app.route('/api/html')
        .get(ml.list);
    
};