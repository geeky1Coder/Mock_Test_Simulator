const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/start-test', (req, res) => {
    const { numQuestions, timeLimit } = req.body;
    const startTime = Math.floor(Date.now() / 1000);
    res.render('test', { numQuestions, timeLimit,startTime });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
