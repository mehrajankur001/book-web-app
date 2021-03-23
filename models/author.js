const mongoose = require('mongoose');

const authorScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Author', authorScema);