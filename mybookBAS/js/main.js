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

        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-category">Category: ${book.category}</p>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;

        booksGrid.appendChild(bookCard);

        // Обработчик для кнопки "сохранить в полку"
        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', () => {
            addToShelf(book);  // Добавляем книгу в "Мою полку"
        });
    });
}

// Загрузка и обработка CSV файла
fetch('/datahere/databooks.csv')  // Путь к CSV файлу на сервере
    .then(response => response.text())
    .then(csvData => {
        // Парсинг CSV с помощью PapaParse
        const parsedData = Papa.parse(csvData, {
            header: true,  // Учитываем заголовки
            skipEmptyLines: true,  // Пропускаем пустые строки
        });

        books = parsedData.data;  // Сохраняем все книги
        renderBooks(books.slice(0, 3));  // Отображаем первые 3 книги по умолчанию
    })
    .catch(error => console.error('Error loading CSV:', error));

// Функция для фильтрации книг по запросу
function filterBooks(query) {
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(query.toLowerCase()) || 
               book.author.toLowerCase().includes(query.toLowerCase()) ||
               book.category.toLowerCase().includes(query.toLowerCase());
    });
    renderBooks(filteredBooks);
}

// Обработчик для кнопки поиска
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Получаем запрос
    if (query) {
        filterBooks(query);  // Отображаем отфильтрованные книги
    } else {
        renderBooks(books);  // Если запрос пустой, показываем все книги
    }
});

// Функция для добавления книги в "Мою полку"
function addToShelf(book) {
    let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем полку из localStorage
    if (!shelf.some(b => b.title === book.title)) {
        shelf.push(book);  // Добавляем книгу, если её ещё нет на полке
        localStorage.setItem('myShelf', JSON.stringify(shelf));  // Сохраняем полку в localStorage
        alert('Book added to your shelf!');
    } else {
        alert('This book is already in your shelf.');
    }
}

// Функция для отображения всех книг при нажатии на "Show All"
document.getElementById('show-all').addEventListener('click', (event) => {
    event.preventDefault();  // Отменяем действие по умолчанию (переход по ссылке)
    renderBooks(books);  // Отображаем все книги
});

// Функция для добавления книги в "Мою полку"
function addToShelf(book) {
    let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем полку из localStorage
    if (!shelf.some(b => b.title === book.title)) {  // Проверяем, есть ли уже такая книга на полке
        shelf.push(book);  // Добавляем книгу, если её нет
        localStorage.setItem('myShelf', JSON.stringify(shelf));  // Сохраняем полку обратно в localStorage
        alert('Book added to your shelf!');  // Выводим уведомление
    } else {
        alert('This book is already in your shelf.');  // Если книга уже есть на полке
    }
}

// Обработчик для кнопки "сохранить в полку"
const heartBtn = bookCard.querySelector('.heart-btn');
heartBtn.addEventListener('click', () => {
    addToShelf(book);  // Добавление книги в полку
});


