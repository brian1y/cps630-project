const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const multer = require('multer')
const path = require('path')
const validator = require('validator');

// define image storing format
const storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

mongoose.connect('mongodb://localhost:27017/projectDB')
    .catch(error => console.error(error));

const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    category: String,
    price: Number,
    location: String,
    imageName: String,
    username: String,
    imageData: Buffer
});

const messageSchema = new mongoose.Schema({
    to: String,
    message: String,
    from: String,
    timestamp: Number
});

const Post = mongoose.model('Post', postSchema);
const Message = mongoose.model('Message', messageSchema);

app.use(express.json());
app.use(cors());

// Querying for posts
app.post('/api/get-posts', async (req, res) => {
    try {
        // console.log(req.body);
        const { category } = req.body;
        let query = req.body.query;
        const regex = /^\s{1,}$/;

        query = validator.blacklist(query, '\[\*,\\\]');

        // Ignore empty space searches
        query.match(regex) ? query = '' : query;

        // Match via regex & case insensitive search
        if (category == 'all') {
            const posts = await Post.find({ $or: [{ title: { $regex: '.*' + query + '.*', $options: 'i' } }, { desc: { $regex: '.*' + query + '.*', $options: 'i' } }], category: { $ne: 'message' } });
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
        // console.log(req.body);
        const { user } = req.body;
        const messages = await Message.find({ to: user.username });
        res.json(messages);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Creating post
app.post('/api/create-post', upload.single('image'), async (req, res) => {
    try {
        const { title, desc, category, price, location, username } = req.body;
        const imageFile = req.file; // Access uploaded file details
        const imageName = imageFile.filename;
        const imageData = imageFile.buffer;
        const regex = /^\s{1,}$/;

        // Prevent empty posts
        if (!title || !desc || !location || !price) {
            return res.status(400).json({ error: 'Title, description, price, or location cannot be empty.' });
        }
        else if (title.match(regex) || desc.match(regex) || location.match(regex) || price.match(regex)) {
            return res.status(400).json({ error: 'Title, description, price, or location cannot be empty.' });
        }
        // Create post
        else {
            const newDoc = await Post.create({ title: title, desc: desc, category: category, price: price, location: location, imageName: imageName, username: username, imageData: imageData });
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
        const { to, message, from, timestamp } = req.body;
        const regex = /^\s{1,}$/;

        // Prevent empty messages
        if (!to || !message || to.match(regex) || message.match(regex)) {
            return res.status(400).json({ error: 'Must specify a message and its recipient.' });
        }
        // Create message
        else {
            const newDoc = await Message.create({ to: to, message: message, from: from, timestamp: timestamp });
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

// getting images
app.get('/api/image/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Send the image data as a response
        res.send(post.imageData);
    } catch (error) {
        res.status(500).send(error);
    }
});

const userRoutes = require('./routes/userRoutes')

// user info routes
app.use('/api/user', userRoutes)

// Listen to port & feedback for server running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
