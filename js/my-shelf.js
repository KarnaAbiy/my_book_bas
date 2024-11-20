const shelfGrid = document.getElementById('shelf-grid');
const showAllButton = document.getElementById('show-all');
const clearShelfButton = document.getElementById('clear-shelf');

// Функция для отображения всех книг
function renderAllBooks() {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    console.log('Все книги из localStorage:', shelf);

    shelfGrid.innerHTML = ''; // Очищаем контейнер

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

// Функция для добавления книги
function addToShelf(book) {
    if (!book.title || !book.author || !book.category) {
        console.error('Книга должна иметь название, автора и категорию!');
        return;
    }

    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    shelf.push(book);
    localStorage.setItem('myShelf', JSON.stringify(shelf));
    console.log('Книга добавлена:', book);
}

// Функция для очистки полки
function clearShelf() {
    localStorage.removeItem('myShelf');
    console.log('Полка очищена');
    renderAllBooks();
}

// Привязка событий к кнопкам
if (showAllButton) {
    showAllButton.addEventListener('click', (event) => {
        event.preventDefault();
        renderAllBooks();
    });
}

if (clearShelfButton) {
    clearShelfButton.addEventListener('click', (event) => {
        event.preventDefault();
        clearShelf();
    });
}

// Отображаем полку при загрузке страницы
renderAllBooks();
