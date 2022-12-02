const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({ 
    name: 'string', 
    email: 'string',
    username: 'string',
    password: 'string',
 });
const Client = mongoose.model('Client', ClientSchema);

module.exports = {Client}