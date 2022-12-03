const connection = require('../config/connection');
const { User, Thought } = require('../models');




// Bulk data to be inserted into DB
const users = [
    {
        "username": "David1",
        "email": "dccodner1@email.com"
    },
    {
        "username": "David2",
        "email": "dccodner2@email.com"
    },
    {
        "username": "David3",
        "email": "dccodner3@email.com"
    },
    {
        "username": "David4",
        "email": "dccodner4@email.com"
    },
    {
        "username": "David5",
        "email": "dccodner5@email.com"
    },
    {
        "username": "David6",
        "email": "dccodner6@email.com"
    },
    {
        "username": "David7",
        "email": "dccodner7@email.com"
    },
    {
        "username": "David8",
        "email": "dccodner8@email.com"
    },
    {
        "username": "David9",
        "email": "dccodner9@email.com"
    }
];

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
        "reactionBody": "Agreed!",
        "username": "David8"
    }
];

const thoughts = [
    {
        thoughtText: 'Good idea,looking forward to seeing it',
        username: 'David1',
        reactions: reactions.slice(0, 2)
    },
    {
        thoughtText: 'Wow, I never would have thought of that',
        username: 'David2'
    },
    {
        thoughtText: 'I dont know about that one',
        username: 'David3'
    },
    {
        thoughtText: 'What a novel idea',
        username: 'David4'
    },
    {
        thoughtText: 'What about implementation?',
        username: 'David5'
    },
    {
        thoughtText: 'Not a fan',
        username: 'David6'
    },
    {
        thoughtText: 'How does this even work?',
        username: 'David7'
    },
    {
        thoughtText: 'Love it',
        username: 'David8',
        reactions: reactions.slice(2, 5)
    },
    {
        thoughtText: 'Collab?',
        username: 'David4'
    },
    {
        thoughtText: 'Where can we find the repo?',
        username: 'David3'
    },
    {
        thoughtText: 'Is there a gitgub project for this?',
        username: 'David4'
    },
    {
        thoughtText: 'I think we should be super meta and have commentary on the course.',
        username: 'David3',
        reactions: reactions.slice(5)
    },
];



//  Logic for inserting data into the DB


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("initializing connection");
    // delete all table contents
    await Thought.deleteMany({});
    await User.deleteMany({});
    console.log("Database cleared");

    console.log("Seeding Users");
    await User.collection.insertMany(users);
    console.log("Users successfully seeded")

for (let i = 0; i < thoughts.length; i++) {
    let newThought = await Thought.create(thoughts[i]);
    await User.findOneAndUpdate({ username: thoughts[i].username }, { $push: { thoughts: newThought._id } });
}
console.log("Database seeded")
process.exit(0);
});


  




