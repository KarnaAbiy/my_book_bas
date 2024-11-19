// const shelfGrid = document.getElementById('shelf-grid');
// const showAllButton = document.getElementById('show-all');

// // Функция для отображения всех книг на полке
// function renderAllBooks() {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем все книги из localStorage
//     shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = `<p>No books added to your shelf yet.</p>`;
//     } else {
//         shelf.forEach(book => {
//             const bookCard = document.createElement('div');
//             bookCard.classList.add('book-card');
//             bookCard.innerHTML = `
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">Author: ${book.author}</p>
//                 <p class="book-category">Category: ${book.category}</p>
//             `;
//             shelfGrid.appendChild(bookCard);
//         });
//     }
// }

// // Обработчик для кнопки "Show All"
// showAllButton.addEventListener('click', (event) => {
//     event.preventDefault();  // Отменяем действие по умолчанию (переход по ссылке)
//     renderAllBooks();  // Отображаем все книги на полке
// });

// // Функция для отображения книг из полки
// function renderShelf() {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем книги с полки
//     shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = '<p>No books in your shelf.</p>';
//     } else {
//         shelf.forEach(book => {
//             const bookCard = document.createElement('div');
//             bookCard.classList.add('book-card');
//             bookCard.innerHTML = `
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">Author: ${book.author}</p>
//                 <p class="book-category">Category: ${book.category}</p>
//             `;
//             shelfGrid.appendChild(bookCard);
//         });
//     }
// }

// Отображаем книги на полке
// renderShelf();
// addToShelf(book);
// // Вызываем renderAllBooks для отображения книг при загрузке страницы
// renderAllBooks();


// const shelfGrid = document.getElementById('shelf-grid');
// const showAllButton = document.getElementById('show-all');

// // Функция для отображения всех книг на полке
// function renderAllBooks() {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем все книги из localStorage
//     console.log('Все книги из localStorage:', shelf);  // Логируем книги
//     shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = `<p>No books added to your shelf yet.</p>`;
//     } else {
//         shelf.forEach(book => {
//             const bookCard = document.createElement('div');
//             bookCard.classList.add('book-card');
//             bookCard.innerHTML = `
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">Author: ${book.author}</p>
//                 <p class="book-category">Category: ${book.category}</p>
//             `;
//             shelfGrid.appendChild(bookCard);
//         });
//     }
// }

// // Обработчик для кнопки "Show All"
// showAllButton.addEventListener('click', (event) => {
//     event.preventDefault();  // Отменяем действие по умолчанию (переход по ссылке)
//     renderAllBooks();  // Отображаем все книги на полке
// });

// // Функция для отображения книг из полки
// function renderShelf() {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем книги с полки
//     console.log('Книги на полке из localStorage:', shelf);  // Логируем книги на полке
//     shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = '<p>No books in your shelf.</p>';
//     } else {
//         shelf.forEach(book => {
//             const bookCard = document.createElement('div');
//             bookCard.classList.add('book-card');
//             bookCard.innerHTML = `
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">Author: ${book.author}</p>
//                 <p class="book-category">Category: ${book.category}</p>
//             `;
//             shelfGrid.appendChild(bookCard);
//         });
//     }
// }

// // Отображаем книги на полке
// renderShelf();

// // Вызываем renderAllBooks для отображения книг при загрузке страницы
// renderAllBooks();

// // Функция для добавления книги на полку
// function addToShelf(book) {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
//     shelf.push(book);
//     localStorage.setItem('myShelf', JSON.stringify(shelf));
//     console.log('Книга добавлена:', book);  // Логируем добавленную книгу
// }

const shelfGrid = document.getElementById('shelf-grid');
const showAllButton = document.getElementById('show-all');

// Функция для отображения всех книг на полке
function renderAllBooks() {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем все книги из localStorage
    console.log('Все книги из localStorage:', shelf);  // Логируем книги
    shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

    if (shelf.length === 0) {
        shelfGrid.innerHTML = `<p>No books added to your shelf yet.</p>`;
    } else {
        shelf.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">Author: ${book.author}</p>
                <p class="book-category">Category: ${book.category}</p>
            `;
            shelfGrid.appendChild(bookCard);
        });
    }
}

// Обработчик для кнопки "Show All"
showAllButton.addEventListener('click', (event) => {
    event.preventDefault();  // Отменяем действие по умолчанию (переход по ссылке)
    renderAllBooks();  // Отображаем все книги на полке
});

// Функция для отображения книг из полки
function renderShelf() {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем книги с полки
    console.log('Книги на полке из localStorage:', shelf);  // Логируем книги на полке
    shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

    if (shelf.length === 0) {
        shelfGrid.innerHTML = '<p>No books in your shelf.</p>';
    } else {
        shelf.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">Author: ${book.author}</p>
                <p class="book-category">Category: ${book.category}</p>
            `;
            shelfGrid.appendChild(bookCard);
        });
    }
}

// Функция для добавления книги на полку
function addToShelf(book) {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    shelf.push(book);
    localStorage.setItem('myShelf', JSON.stringify(shelf));
    console.log('Книга добавлена:', book);  // Логируем добавленную книгу
}

// Пример добавления книги при вызове
const newBook = {
    title: 'New Book Title',
    author: 'Author Name',
    category: 'Category'
};
addToShelf(newBook);

// Отображаем книги на полке
renderShelf();
