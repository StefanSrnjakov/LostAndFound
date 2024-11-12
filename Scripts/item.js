const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['lost', 'found'] },
    description: { type: String, required: true },
    category: { type: String, required: true },
    dateFound: { type: Date },
    dateLost: { type: Date },
    publishedAt: { type: Date, default: Date.now },
    lastUpdatedAt: { type: Date, default: Date.now },
    locationFound: { type: String, required: true },
    status: { type: String, required: true, default: 'listed', enum: ['listed', 'claimed'] },
    email: { type: String },
    number: { type: String },
    image: { type: String }
});

module.exports = mongoose.model('Item', ItemSchema);
