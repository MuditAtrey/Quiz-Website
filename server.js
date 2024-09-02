const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

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

    // Store the username on the server (e.g., in a database)
    storeUsernameOnServer(username);

    res.json({ message: 'Username submitted successfully' });
});

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