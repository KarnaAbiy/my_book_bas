const booksGrid = document.getElementById('books-grid');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const reviewsGrid = document.getElementById('reviews-grid');
const ratingsGrid = document.getElementById('ratings-grid');

let books = [];

function renderBooks(booksList, gridElement) {
    gridElement.innerHTML = '';
    booksList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img class="book-cover" src="${book.cover}" alt="${book.title}">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-category">Category: ${book.category}</p>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;
        gridElement.appendChild(bookCard);
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', () => {
            addToShelf(book);
        });
    });
}

// Функция для поиска книг через Google Books API
function searchBooks(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                books = data.items.map(item => {
                    return {
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        averageRating: item.volumeInfo.averageRating || 'N/A',
                        ratingsCount: item.volumeInfo.ratingsCount || 'N/A'
                    };
                });
                if (books.length > 0) {
                    renderBooks(books, booksGrid);
                } else {
                    renderRandomBooks(); 
                }
            } else {
                alert('No books found for the search query.');
                renderRandomBooks();
            }
        })
        .catch(error => {
            console.error('Error fetching books from Google API:', error);
            renderRandomBooks();
        });
}

function filterBooks(query) {
    if (query) {
        searchBooks(query);
    } else {
        renderRandomBooks();
    }
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    filterBooks(query);
});

// Функция для добавления книги в "Мою полку"
function addToShelf(book) {
    let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    if (!shelf.some(b => b.title === book.title)) {
        shelf.push(book);
        localStorage.setItem('myShelf', JSON.stringify(shelf));
        alert('Book added to your shelf!');
    } else {
        alert('This book is already in your shelf.');
    }
}

function renderRandomBooks() {
    if (books.length > 0) {
        const randomBooks = [];
        const booksToShow = Math.min(3, books.length);
        for (let i = 0; i < booksToShow; i++) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            randomBooks.push(randomBook);
        }
        renderBooks(randomBooks, booksGrid);
    } else {
        alert('No books available to recommend.');
    }
}

document.getElementById('show-all').addEventListener('click', (event) => {
    event.preventDefault();
    renderBooks(books, booksGrid);
});

// Функция для получения отзывов и рейтингов
function fetchBookDetails(section, gridElement, type) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${section}&maxResults=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                const bookDetails = data.items.map(item => {
                    return {
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        averageRating: item.volumeInfo.averageRating || 'N/A',
                        ratingsCount: item.volumeInfo.ratingsCount || 'N/A'
                    };
                });
                if (type === 'reviews') {
                    renderBooks(bookDetails, gridElement);
                } else {
                    renderBooks(bookDetails, gridElement);
                }
            } else {
                alert(`No ${type} found for section ${section}.`);
            }
        })
        .catch(error => {
            console.error(`Error fetching ${type} for section ${section}:`, error);
        });
}

// Получаем данные для каждой секции
fetchBookDetails('reviews', reviewsGrid, 'reviews');
fetchBookDetails('ratings', ratingsGrid, 'ratings');

renderRandomBooks();

function renderBooks(booksList, gridElement) {
    gridElement.innerHTML = '';
    booksList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img class="book-cover" src="${book.cover}" alt="${book.title}">
            <div class="card-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">Author: ${book.author}</p>
                <p class="book-category">Category: ${book.category}</p>
            </div>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;
        gridElement.appendChild(bookCard);
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', () => {
            addToShelf(book);
        });
    });
}
