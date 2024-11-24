const booksGrid = document.getElementById('books-grid');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// Массив для хранения книг
let books = [];

// Функция для отображения книг
function renderBooks(booksList) {
    booksGrid.innerHTML = ''; // Очищаем контейнер перед добавлением новых книг
    booksList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        // Динамическая картинка и информация о книге
        bookCard.innerHTML = `
            <img class="book-cover" src="${book.cover}" alt="${book.title}">
            <div class="card-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">Author: ${book.author}</p>
                <p class="book-category">Category: ${book.category}</p>
            </div>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;

        booksGrid.appendChild(bookCard);

        // Обработчик для кнопки "сохранить в полку"
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', () => {
            addToShelf(book);  // Добавляем книгу в "Мою полку"
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
                    };
                });
                if (books.length > 0) {
                    renderBooks(books);  // Отображаем результаты поиска
                } else {
                    renderRandomBooks();  // Если книги не найдены, показываем случайные книги
                }
            } else {
                alert('No books found for the search query.');
                renderRandomBooks();  // Если ничего не найдено, показываем случайные книги
            }
        })
        .catch(error => {
            console.error('Error fetching books from Google API:', error);
            renderRandomBooks();  // В случае ошибки показываем случайные книги
        });
}

// Функция для фильтрации книг по запросу
function filterBooks(query) {
    if (query) {
        searchBooks(query);  // Ищем книги через Google API
    } else {
        renderRandomBooks();  // Если запрос пустой, показываем случайные книги
    }
}

// Обработчик для кнопки поиска
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Получаем запрос
    filterBooks(query);  // Отображаем отфильтрованные книги
});

// Функция для добавления книги в "Мою полку"
function addToShelf(book) {
    let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем полку из localStorage
    if (!shelf.some(b => b.title === book.title)) {
        shelf.push(book);  // Добавляем книгу, если её ещё нет на полке
        localStorage.setItem('myShelf', JSON.stringify(shelf));  // Сохраняем полку в localStorage
        alert('Book added to your shelf!');
    } else {
        alert('This book is already in your shelf.');
    }
}

// Функция для отображения случайных книг
function renderRandomBooks() {
    if (books.length > 0) {
        const randomBooks = [];
        const booksToShow = Math.min(3, books.length);  // Ограничиваем число случайных книг до 3
        for (let i = 0; i < booksToShow; i++) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            randomBooks.push(randomBook);
        }
        renderBooks(randomBooks);  // Отображаем случайные книги
    } else {
        alert('No books available to recommend.');
    }
}

// Функция для отображения всех книг при нажатии на "Show All"
document.getElementById('show-all').addEventListener('click', (event) => {
    event.preventDefault();  // Отменяем действие по умолчанию (переход по ссылке)
    renderBooks(books);  // Отображаем все книги
});

// Инициализация: Показываем случайные книги при загрузке страницы
renderRandomBooks();
