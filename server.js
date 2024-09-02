const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);   

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database',   
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);   

});

// Parse request bodies (for handling form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit-username', (req, res) => {
    const username = req.body.username;

    // Store the username in the database
    storeUsernameOnServer(username);

    res.json({ message: 'Username submitted successfully' });
});

function storeUsernameOnServer(username) {
    const newUsername = new UsernameModel({ username });
    newUsername.save()
        .then(() => {
            console.log('Username stored successfully:', username);
        })
        .catch(err => {
            console.error('Error storing username:', err);
        });
}


// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle new username events
    socket.on('newUsername', (username) => {
        console.log('new username:', username);
        io.emit('newUsername', username);
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});