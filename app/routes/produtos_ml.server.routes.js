/**
 * Created by Vittorio on 10/05/2016.
 */

var ml = require('../controllers/produtos_ml.server.controller.js');

module.exports = function(app) {

    app.route('/api/produtos_ml')
        .get(ml.list)
        .post(ml.create);

    app.route('/api/produtos_ml/:produtoId')
        .get(ml.read)
        .put(ml.updateSoldQuantity, ml.list)
        .delete(ml.delete);
    

    app.param('produtoId', ml.findById);

};