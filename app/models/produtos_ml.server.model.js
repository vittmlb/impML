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
    site_id: {
        type: String,
        default: '',
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        default: '',
        trim: true
    },
    seller_id: {
        type: Number,
        required: 'O campo seller_id é obrigatório'
    },
    category_id: {
        type: String
    },
    price: {
        type: Currency,
        default: 0,
        get: function(value) {
            return value / 100;
        }
    },
    base_price: {
        type: Currency,
        default: 0,
        get: function(value) {
            return value / 100;
        }
    },
    currency_id: {
        type: String
    },
    initial_quantity: {
        type: Number,
        default: -1
    },
    available_quantity: {
        type: Number,
        default: -1
    },
    sold_quantity: {
        type: Number,
        default: -1
    },
    buying_mode: {
        type: String
    },
    listing_type_id: {
        type: String
    },
    start_time: {
        type: Date
    },
    stop_time: {
        type: Date
    },
    condition: {
        type: String
    },
    permalink: {
        type: String
    },
    thumbnail: {
        type: String
    },
    secure_thumbnail: {
        type: String
    },
    tags: {
        type: String,
        default: '',
        trim: true
    },
    date_created: {
        type: Date
    },
    date_updated: {
        type: Date
    }
});

ProdutoMLSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('ProdutoML', ProdutoMLSchema);