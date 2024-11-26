const booksGrid = document.getElementById('books-grid');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const searchBooksGrid = document.getElementById('search-books-grid');
const searchResultsSection = document.getElementById('search-results-section');
const reviewsGrid = document.getElementById('reviews-grid');
const shelfCategoriesGrid = document.getElementById('shelf-categories-grid');

let books = [];

// Функция для отображения книг
function renderBooks(booksList, gridElement) {
    gridElement.innerHTML = '';
    booksList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <a href="/html/book-details.html?id=${book.id}">
                <img class="book-cover" src="${book.cover}" alt="${book.title}">
                <div class="card-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">Author: ${book.author}</p>
                    <p class="book-category">Category: ${book.category}</p>
                </div>
            </a>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;
        gridElement.appendChild(bookCard);
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Останавливаем всплытие события
            addToShelf(book);
        });
    });

    // Сохраняем книги в локальное хранилище
    localStorage.setItem('books', JSON.stringify(books));
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
                        id: item.id, // Добавляем ID книги
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        description: item.volumeInfo.description || 'No description available' // Добавляем описание книги
                    };
                });
                if (books.length > 0) {
                    searchResultsSection.style.display = 'block'; // Показываем секцию результатов поиска
                    renderBooks(books, searchBooksGrid); // Отображаем результаты поиска в новой секции
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

// Функция для получения книг с наивысшим рейтингом
function getRandomTopRatedBooks() {
    const startIndex = Math.floor(Math.random() * 100); // Случайный начальный индекс для получения разных книг
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=highly+rated&maxResults=10&orderBy=relevance&startIndex=${startIndex}`;
    
    console.log(`Fetching top rated books with startIndex ${startIndex}`);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                const topRatedBooks = data.items.map(item => {
                    return {
                        id: item.id,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        description: item.volumeInfo.description || 'No description available'
                    };
                });
                console.log("Top rated books fetched:", topRatedBooks);
                renderBooks(topRatedBooks, reviewsGrid);
            } else {
                alert('No top rated books found.');
            }
        })
        .catch(error => {
            console.error('Error fetching top rated books:', error);
        });
}

// Функция для получения книг в "Моей полке"
function getBooksFromShelf() {
    return JSON.parse(localStorage.getItem('myShelf')) || [];
}

// Функция для получения рекомендаций на основе книг в "Моей полке"
function getRecommendationsByShelfBooks() {
    const shelfBooks = getBooksFromShelf();
    console.log("Books from shelf:", shelfBooks);

    if (shelfBooks.length > 0) {
        const recommendedBooks = [];

        const fetchSimilarBooks = (book) => {
            const query = `${book.title} ${book.author}`;
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;

            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.items) {
                        const similarBooks = data.items.map(item => {
                            return {
                                id: item.id,
                                title: item.volumeInfo.title,
                                author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                                category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                                cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                                description: item.volumeInfo.description || 'No description available'
                            };
                        });
                        recommendedBooks.push(...similarBooks);
                    } else {
                        console.log(`No similar books found for ${book.title} by ${book.author}`);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching similar books for ${book.title} by ${book.author}:`, error);
                });
        };

        const fetchAllSimilarBooks = async () => {
            for (const book of shelfBooks) {
                await fetchSimilarBooks(book);
            }
            console.log("Recommended books fetched:", recommendedBooks);
            renderBooks(recommendedBooks, shelfCategoriesGrid);
        };

        fetchAllSimilarBooks();
    }
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
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    getRandomTopRatedBooks(); // Получаем книги с наивысшим рейтингом
    getRecommendationsByShelfBooks(); // Получаем рекомендации на основе книг из "Моей полки"
});

renderRandomBooks();
