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

const users = [
    { "username": "David1",
    "email": "dccodner1@email.com" 
   },
   { "username": "David2",
    "email": "dccodner1@email.com" 
   },
   { "username": "David3",
    "email": "dccodner1@email.com" 
   },
   { "username": "David4",
    "email": "dccodner1@email.com" 
   },
   { "username": "David5",
    "email": "dccodner1@email.com" 
   },
   { "username": "David6",
    "email": "dccodner1@email.com" 
   },
   { "username": "David7",
    "email": "dccodner1@email.com" 
   },
   { "username": "David8",
    "email": "dccodner1@email.com" 
   },
   { "username": "David9",
    "email": "dccodner1@email.com" 
   }
];

const thoughts = [

]

const reactions = [
    {
        "reactionBody": "Nice!",
        "username": "David1"
    },
    {
        "reactionBody": "Sweet!",
        "username": "David2"
    },
    {
        "reactionBody": "Noice!",
        "username": "David4"
    },
    {
        "reactionBody": "Stellar work!",
        "username": "David6"
    },
    {
        "reactionBody": "Good job!",
        "username": "David8"
    }
]