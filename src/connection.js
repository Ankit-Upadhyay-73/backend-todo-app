
const mongoose = require('mongoose');

require('dotenv').config();
async function loadConnection(){
    await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = {loadConnection}