var mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    authors: [{
        name: String,
        surname: String
    }],
    publisher: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    noOfPages: Number,
    issue: Number
});

module.exports = mongoose.model('comics', Schema);