var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Calendar = new Schema({

    guid: { type: ObjectId },

    destjid: { type: String },

    title: { type: String },

    content: { type: String },

    starttime: { type: Date, default: Date.now },

    createtime: { type: Date, default: Date.now },
    updatetime: { type: Date, default: Date.now }
});

mongoose.model('Calendar', Calendar);

module.exports = mongoose.model('Calendar');