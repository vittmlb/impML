/**
 * Created by Vittorio on 12/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ProdutoMLSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    }
});

ProdutoMLSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('ProdutoML', ProdutoMLSchema);