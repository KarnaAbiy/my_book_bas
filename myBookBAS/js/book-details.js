document.addEventListener('DOMContentLoaded', function() {
    // Get the book ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    if (!bookId) {
        alert('Book ID is missing');
        return;
    }

    const addToLibraryButton = document.querySelector('.add-to-library-btn');

    // Fetch the book details using the Google Books API
    async function fetchBookDetails() {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const book = data.volumeInfo;

            // Populate the page with the book details
            document.getElementById('book-title').textContent = book.title;
            document.getElementById('book-author').textContent = `Author: ${book.authors ? book.authors.join(', ') : 'Unknown'}`;
            document.getElementById('book-category').textContent = `Category: ${book.categories ? book.categories.join(', ') : 'Unknown'}`;
            document.getElementById('book-published-date').textContent = `Published: ${book.publishedDate || 'N/A'}`;
            document.getElementById('book-page-count').textContent = `Pages: ${book.pageCount || 'N/A'}`;
            document.getElementById('book-rating').textContent = `Rating: ${book.averageRating || 'N/A'}`;
            document.getElementById('book-description').textContent = `Description: ${book.description || 'No description available.'}`;
            document.getElementById('book-publisher').textContent = `Publisher: ${book.publisher || 'N/A'}`;
            document.getElementById('book-language').textContent = `Language: ${book.language || 'N/A'}`;
            document.getElementById('book-isbn').textContent = `ISBN: ${book.industryIdentifiers ? book.industryIdentifiers.map(id => id.identifier).join(', ') : 'N/A'}`;
            document.getElementById('book-average-rating').textContent = `Average Rating: ${book.averageRating || 'N/A'}`;
            document.getElementById('book-ratings-count').textContent = `Ratings Count: ${book.ratingsCount || 'N/A'}`;
            
            // Display the book cover
            document.getElementById('book-cover').src = book.imageLinks ? book.imageLinks.thumbnail : '/images/default-cover.jpg';

        } catch (error) {
            console.error('Error fetching book details:', error);
            alert('Error fetching book details');
        }
    }

    // Add book to library (localStorage)
    function addToLibrary() {
        const bookDetails = {
            id: bookId,
            title: document.getElementById('book-title').textContent,
            author: document.getElementById('book-author').textContent,
            cover: document.getElementById('book-cover').src,
            category: document.getElementById('book-category').textContent,
            description: document.getElementById('book-description').textContent,
            publisher: document.getElementById('book-publisher').textContent,
            language: document.getElementById('book-language').textContent,
            isbn: document.getElementById('book-isbn').textContent,
            averageRating: document.getElementById('book-average-rating').textContent,
            ratingsCount: document.getElementById('book-ratings-count').textContent
        };

        let library = JSON.parse(localStorage.getItem('myLibrary')) || [];

        if (!library.some(b => b.id === bookId)) {
            library.push(bookDetails);
            localStorage.setItem('myLibrary', JSON.stringify(library));
            alert('Book added to your library!');
        } else {
            alert('This book is already in your library.');
        }
    }

    addToLibraryButton.addEventListener('click', addToLibrary);

    // Fetch and display the book details on page load
    fetchBookDetails();
});
