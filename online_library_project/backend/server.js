
const express = require('express');
const app = express();
const books = require('./data/books.json');

app.use(express.static('frontend'));

app.get('/api/books', (req, res) => {
    res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
