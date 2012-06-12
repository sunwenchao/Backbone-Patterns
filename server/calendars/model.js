var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Calendar = new Schema({

    destjid: { type: String },

    title: { type: String },

    content: { type: String },

    starttime: { type: Date, default: Date.now },

    createtime: { type: Date, default: Date.now },
    updatetime: { type: Number, default: Date.now }
});

mongoose.model('Calendar', Calendar);

module.exports = mongoose.model('Calendar');