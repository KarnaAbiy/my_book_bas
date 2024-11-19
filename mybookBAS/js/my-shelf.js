// const shelfGrid = document.getElementById('shelf-grid');

// // Функция для отображения книг из полки
// function renderShelf() {
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем книги с полки
//     shelfGrid.innerHTML = '';  // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = '<p>No books in your shelf.</p>';
//     } else {
//         shelf.forEach(book => {
//             if (book && book.title && book.author && book.category) {  // Проверка на наличие всех данных
//                 const bookCard = document.createElement('div');
//                 bookCard.classList.add('book-card');

//                 bookCard.innerHTML = `
//                     <h3 class="book-title">${book.title}</h3>
//                     <p class="book-author">Author: ${book.author}</p>
//                     <p class="book-category">Category: ${book.category}</p>
//                 `;

//                 shelfGrid.appendChild(bookCard);
//             }
//         });
//     }
// }

// // Получаем книги из localStorage
// let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];

// // Функция для отображения книг на полке
// function renderShelfBooks() {
//     shelfGrid.innerHTML = ''; // Очищаем контейнер перед добавлением новых книг
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

// // Отображаем книги на полке
// renderShelfBooks();


// // Отображаем книги с полки
// renderShelf();


const shelfGrid = document.getElementById('shelf-grid');

// // Функция для отображения всех книг из полки
// function renderShelfBooks() {
//     // Получаем все книги из localStorage
//     const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
//     shelfGrid.innerHTML = ''; // Очищаем контейнер перед добавлением новых книг

//     if (shelf.length === 0) {
//         shelfGrid.innerHTML = `<p>No books added to your shelf yet.</p>`;
//     } else {
//         // Перебираем все книги и отображаем их
//         shelf.forEach(book => {
//             if (book && book.title && book.author && book.category) {  // Проверка на наличие всех данных
//                 const bookCard = document.createElement('div');
//                 bookCard.classList.add('book-card');
//                 bookCard.innerHTML = `
//                     <h3 class="book-title">${book.title}</h3>
//                     <p class="book-author">Author: ${book.author}</p>
//                     <p class="book-category">Category: ${book.category}</p>
//                 `;
//                 shelfGrid.appendChild(bookCard);
//             }
//         });
//     }
// }
const showAllButton = document.getElementById('show-all');

// Функция для отображения всех книг на полке
function renderAllBooks() {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];  // Получаем все книги из localStorage
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

// Отображаем книги на полке
renderShelf();


// Вызываем renderAllBooks для отображения книг при загрузке страницы
renderAllBooks();
