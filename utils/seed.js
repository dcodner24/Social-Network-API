const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Seeds DB connection established');
    // delete all table contents
    console.log('Deleting existing data....');
    await Thought.deleteMany({});
    await User.deleteMany({});
});