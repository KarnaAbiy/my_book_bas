document.addEventListener('DOMContentLoaded', function() {
    const booksGrid = document.getElementById('books-grid');
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const searchBooksGrid = document.getElementById('search-books-grid');
    const searchResultsSection = document.getElementById('search-results-section');
    const reviewsGrid = document.getElementById('reviews-grid');
    const shelfCategoriesGrid = document.getElementById('shelf-categories-grid');

    let books = [];

    function renderBooks(booksList, gridElement) {
        gridElement.innerHTML = '';
        booksList.forEach(book => {
            const bookCard = createBookCard(book);
            gridElement.appendChild(bookCard);
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <a href="/html/book-details.html?id=${book.id}">
                <img class="book-cover" src="${book.cover}" alt="${book.title}">
                <div class="card-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">Автор: ${book.author}</p>
                    <p class="book-category">Категория: ${book.category}</p>
                </div>
            </a>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;

        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToShelf(book);
        });

        return bookCard;
    }

    async function searchBooks(query) {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;
    
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            let fetchedBooks = [];
            if (data.items) {
                fetchedBooks = data.items.map(item => {
                    return {
                        id: item.id,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        description: item.volumeInfo.description || 'No description available'
                    };
                });
            }

            const combinedBooks = fetchedBooks;
    
            if (combinedBooks.length > 0) {
                searchResultsSection.style.display = 'block';
                renderBooks(combinedBooks, searchBooksGrid);
            } else {
                alert('По вашему запросу книг не найдено.');
                renderRandomBooks();
            }
        } catch (error) {
            console.error('Ошибка при получении книг из Google API:', error);
            renderRandomBooks();
        }
    }
    

    async function getRandomTopRatedBooks() {
        const startIndex = Math.floor(Math.random() * 100);
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=highly+rated&maxResults=10&orderBy=relevance&startIndex=${startIndex}`;

        console.log(`Fetching top rated books with startIndex ${startIndex}`);

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items) {
                const topRatedBooks = data.items.map(item => {
                    return {
                        id: item.id,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        description: item.volumeInfo.description || 'Описание отсутствует'
                    };
                });
                console.log("Top rated books fetched:", topRatedBooks);
                renderBooks(topRatedBooks, reviewsGrid);
            } else {
                alert('Не найдено книг с высоким рейтингом.');
            }
        } catch (error) {
            console.error('Ошибка при получении книг с высоким рейтингом:', error);
        }
    }

    function getBooksFromShelf() {
        return JSON.parse(localStorage.getItem('myShelf')) || [];
    }

    async function getRecommendationsByShelfBooks() {
        const shelfBooks = getBooksFromShelf();
        console.log("Книги с полки:", shelfBooks);

        if (shelfBooks.length > 0) {
            const recommendedBooks = [];

            const fetchSimilarBooks = async (book) => {
                const query = `${book.title} ${book.author}`;
                const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;

                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (data.items) {
                        const similarBooks = data.items.map(item => {
                            return {
                                id: item.id,
                                title: item.volumeInfo.title,
                                author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                                category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                                cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                                description: item.volumeInfo.description || 'Описание отсутствует'
                            };
                        });
                        recommendedBooks.push(...similarBooks);
                    } else {
                        console.log(`Похожие книги не найдены для ${book.title} by ${book.author}`);
                    }
                } catch (error) {
                    console.error(`Ошибка при получении похожих книг для ${book.title} by ${book.author}:`, error);
                }
            };

            for (const book of shelfBooks) {
                await fetchSimilarBooks(book);
            }
            console.log("Рекомендованные книги получены:", recommendedBooks);
            renderBooks(recommendedBooks, shelfCategoriesGrid);
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

    function addToShelf(book) {
        let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
        if (!shelf.some(b => b.title === book.title)) {
            shelf.push(book);
            localStorage.setItem('myShelf', JSON.stringify(shelf));
            alert('Книга добавлена на вашу полку!');
        } else {
            alert('Эта книга уже на вашей полке.');
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

    getRandomTopRatedBooks();
    getRecommendationsByShelfBooks();
    renderRandomBooks();
});
