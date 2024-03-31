const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/projectDB').
    catch(error => console.error(error));

// TODO: add price & location
const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    category: String
});

const Post = mongoose.model('Post', postSchema);

app.use(express.json());
app.use(cors());

// Querying
app.post('/api/get-posts', async (req, res) => {
    try {
        // Debugging
        console.log(req.body);

        if (req.body.category == 'all') {
            const posts = await Post.find({}); 
            res.json(posts);
        }
        else {
            const posts = await Post.find({ category: req.body.category })
            res.json(posts);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Creating
app.post('/api/create-posts', async (req, res) => {
    try {
        const { title, desc, category } = req.body;
        const regex = /^\s{1,}$/;

        // Prevent empty posts
        if (!title || !desc) {
            return res.status(400).json({error: 'Title and description cannot be empty.'});
        }
        else if (title.match(regex) || desc.match(regex)) {
            return res.status(400).json({error: 'Title and description cannot be empty.'});
        }
        // Create post
        else {
            const newDoc = await Post.create({title: title, desc: desc, category: category});
            res.status(201).json(newDoc);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Listen to port & feedback for server running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})