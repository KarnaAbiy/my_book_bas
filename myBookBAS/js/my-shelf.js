const shelfGrid = document.getElementById('shelf-grid');
const showAllButton = document.getElementById('show-all');
const clearShelfButton = document.getElementById('clear-shelf');

function renderAllBooks() {
    const shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    console.log('Все книги из localStorage:', shelf);

    shelfGrid.innerHTML = '';

    if (shelf.length === 0) {
        shelfGrid.innerHTML = `<p>No books added to your shelf yet.</p>`;
    } else {
        shelf.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <img class="book-cover" src="${book.cover}" alt="${book.title}">
                <div class="card-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">Author: ${book.author}</p>
                    <p class="book-category">Category: ${book.category}</p>
                </div>
            `;
            shelfGrid.appendChild(bookCard);
        });
    }
}

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

function clearShelf() {
    localStorage.removeItem('myShelf');
    console.log('Полка очищена');
    renderAllBooks();
}

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

renderAllBooks();

document.addEventListener("DOMContentLoaded", function() {
    const shelfGrid = document.getElementById("shelf-grid");
    const shelf = JSON.parse(localStorage.getItem("shelf")) || [];

    shelf.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-card");

        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;

        shelfGrid.appendChild(bookElement);
    });

    document.getElementById("clear-shelf").addEventListener("click", function() {
        localStorage.removeItem("shelf");
        alert("Shelf cleared!");
        window.location.reload();
    });
});

