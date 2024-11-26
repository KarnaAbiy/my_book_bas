const booksGrid = document.getElementById('books-grid');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const ratingSelect = document.getElementById('rating-select');
const reviewsGrid = document.getElementById('reviews-grid');

// Массив для хранения книг
let books = [];

// Ограниченный список категорий
const categories = [
    "fiction", "nonfiction", "children", "romance",
    "science-fiction", "fantasy", "mystery", "horror",
    "biography", "self-help", "history", "science",
    "business", "art", "music"
];

// Функция для отображения категорий в селекторе
function renderCategoryOptions() {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
}

// Функция для отображения книг
function renderBooks(booksList) {
    booksGrid.innerHTML = ''; // Очищаем контейнер перед добавлением новых книг
    booksList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        // Динамическая картинка и информация о книге
        bookCard.innerHTML = `
            <a href="/html/book-details.html?id=${book.id}">
                <img class="book-cover" src="${book.cover}" alt="${book.title}">
                <div class="card-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">Author: ${book.author}</p>
                    <p class="book-category">Category: ${book.category}</p>
                    <p class="book-rating">Rating: ${book.rating ? book.rating : 'Not Rated'}</p>
                </div>
            </a>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;

        booksGrid.appendChild(bookCard);

        // Обработчик для кнопки "сохранить в полку"
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Останавливаем всплытие события
            addToShelf(book);  // Добавляем книгу в "Мою полку"
        });
    });

    // Сохраняем книги в локальное хранилище
    localStorage.setItem('books', JSON.stringify(booksList));
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
                        id: item.id,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                        category: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
                        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/default-cover.jpg',
                        rating: item.volumeInfo.averageRating || 0, // Добавляем рейтинг книги
                    };
                });

                // Добавляем загруженные пользователем книги
                const userBooks = JSON.parse(localStorage.getItem('books')) || [];
                books = books.concat(userBooks);

                if (books.length > 0) {
                    const selectedRating = ratingSelect.value; // Получаем выбранный рейтинг
                    const filteredBooks = books.filter(book => book.rating >= selectedRating); // Фильтруем книги по рейтингу
                    renderBooks(filteredBooks);  // Отображаем результаты поиска
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

// Функция для фильтрации книг по запросу и рейтингу
function filterBooks(query) {
    if (query) {
        searchBooks(query);  // Ищем книги через Google API с фильтрацией
    } else {
        renderRandomBooks();  // Если запрос пустой, показываем случайные книги
    }
}

// Обработчик для кнопки поиска и фильтра по рейтингу
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();  // Получаем запрос
    filterBooks(query);  // Отображаем отфильтрованные книги
});

// Обработчик для выбора категории
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value; // Получаем выбранную категорию
    if (selectedCategory) {
        searchBooks(`subject:${selectedCategory}`); // Ищем книги по выбранной категории
    } else {
        renderRandomBooks(); // Если категория не выбрана, показываем случайные книги
    }
});

// Обработчик для выбора рейтинга
ratingSelect.addEventListener('change', () => {
    const query = searchInput.value.trim(); // Получаем запрос
    filterBooks(query);  // Отображаем отфильтрованные книги
});

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
    }
}

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

// Инициализация: Показываем случайные книги при загрузке страницы
renderRandomBooks();
renderCategoryOptions(); // Отображаем категории в селекторе

// Добавляем опции для рейтинга
const ratings = ["1", "2", "3", "4", "5"];
ratings.forEach(rating => {
    const option = document.createElement('option');
    option.value = rating;
    option.textContent = `${rating}+ Stars`;
    ratingSelect.appendChild(option);
});
