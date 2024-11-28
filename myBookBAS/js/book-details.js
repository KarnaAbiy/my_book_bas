const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

function displayBookDetails(book) {
    document.getElementById('book-cover').src = book.cover;
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-author').textContent = `Author: ${book.author}`;
    document.getElementById('book-category').textContent = `Category: ${book.category}`;
    document.getElementById('book-published-date').textContent = `Published Date: ${book.publishedDate || 'Unknown'}`;
    document.getElementById('book-page-count').textContent = `Page Count: ${book.pageCount || 'Unknown'}`;
    document.getElementById('book-rating').textContent = `Rating: ${book.rating}`;
    document.getElementById('book-description').textContent = book.description;
    document.getElementById('book-publisher').textContent = `Publisher: ${book.publisher || 'Unknown'}`;
    document.getElementById('book-language').textContent = `Language: ${book.language || 'Unknown'}`;
    document.getElementById('book-isbn').textContent = `ISBN: ${book.isbn || 'Unknown'}`;
    document.getElementById('book-average-rating').textContent = `Average Rating: ${book.averageRating || 'Not Rated'}`;
    document.getElementById('book-ratings-count').textContent = `Ratings Count: ${book.ratingsCount || 'No Ratings'}`;
}

const books = JSON.parse(localStorage.getItem('books')) || [];
const book = books.find(b => b.id === bookId);

if (book) {
    displayBookDetails(book);
} else {
    alert('Book not found');
}
