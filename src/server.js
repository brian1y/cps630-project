const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/projectDB').
    catch(error => console.error(error));

// TODO: add price, location, & user
const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    category: String
});

const Post = mongoose.model('Post', postSchema);

app.use(express.json());
app.use(cors());

// Querying for posts
app.post('/api/get-posts', async (req, res) => {
    try {
        // console.log(req.body);
        const { category } = req.body;
        let query = req.body.query;
        const regex = /^\s{1,}$/;

        // Ignore empty space searches
        query.match(regex) ? query = '' : query;

        // Match via regex & case insensitive search
        if (category == 'all') {
            const posts = await Post.find({ $or: [{ title: { $regex: '.*' + query + '.*', $options: 'i' } }, { desc: { $regex: '.*' + query + '.*', $options: 'i' } }], category: { $ne: 'message' }});
            res.json(posts);
        }
        else {
            const posts = await Post.find({ $or: [{ title: { $regex: '.*' + query + '.*', $options: 'i' } }, { desc: { $regex: '.*' + query + '.*', $options: 'i' } }], category: category });
            res.json(posts);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Querying for messages
app.post('/api/get-messages', async (req, res) => {
    try {
        const user = req.body;
        const posts = await Post.find({ category: 'message' });
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Creating post
app.post('/api/create-post', async (req, res) => {
    try {
        const { title, desc, category } = req.body;
        const regex = /^\s{1,}$/;

        // Prevent empty posts
        if (!title || !desc) {
            return res.status(400).json({ error: 'Title and description cannot be empty.' });
        }
        else if (title.match(regex) || desc.match(regex)) {
            return res.status(400).json({ error: 'Title and description cannot be empty.' });
        }
        // Create post
        else {
            const newDoc = await Post.create({ title: title, desc: desc, category: category });
            res.status(201).json(newDoc);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Create messsage
app.post('/api/send-message', async (req, res) => {
    try {
        const { to, message, from } = req.body;
        const regex = /^\s{1,}$/;

        // Prevent empty messages
        if (!title || !desc || title.match(regex) || desc.match(regex) {
            return res.status(400).json({ error: 'Must specify a message and its recipient.' });
        }
        // Create message
        else {
            const newDoc = await Post.create({ title: to, desc: message, url: from, category: 'message' });
            res.status(201).json(newDoc);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Deleting
app.post('/api/delete-post', async (req, res) => {
    try {
        const id = req.body._id;
        // console.log(id);

        if (await Post.findById(id)) {
            await Post.deleteOne({ _id: id });

            // console.log(await Post.findById(id))
            return res.status(200).json({ body: 'Post deleted.' });
        }
        else {
            return res.status(400).json({ error: 'Post not found.' });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

const userRoutes = require('./routes/userRoutes')

// user info routes
app.use('/api/user', userRoutes)

// Listen to port & feedback for server running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
