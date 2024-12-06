const booksGrid = document.getElementById('books-grid');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const ratingSelect = document.getElementById('rating-select');
const reviewsGrid = document.getElementById('reviews-grid');

let books = [];

const categories = [
    "fiction", "nonfiction", "children", "romance",
    "science-fiction", "fantasy", "mystery", "horror",
    "biography", "self-help", "history", "science",
    "business", "art", "music"
];

function renderCategoryOptions() {
    console.log("Rendering category options...");
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
    console.log("Categories rendered:", categories);
}

function renderBooks(booksList) {
    booksGrid.innerHTML = '';
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
                    <p class="book-rating">Rating: ${book.rating ? book.rating : 'Not Rated'}</p>
                </div>
            </a>
            <button class="heart-btn" data-title="${book.title}">❤️</button>
        `;

        booksGrid.appendChild(bookCard);

        const heartBtn = bookCard.querySelector('.heart-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToShelf(book);
        });
    });

    localStorage.setItem('books', JSON.stringify(booksList));
}

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
                        rating: item.volumeInfo.averageRating || 0,
                    };
                });

                if (books.length > 0) {
                    const selectedRating = ratingSelect.value;
                    const filteredBooks = books.filter(book => book.rating >= selectedRating);
                    renderBooks(filteredBooks);
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

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        searchBooks(`subject:${selectedCategory}`);
    } else {
        renderRandomBooks();
    }
});

ratingSelect.addEventListener('change', () => {
    const query = searchInput.value.trim();
    filterBooks(query);
});

function renderRandomBooks() {
    if (books.length > 0) {
        const randomBooks = [];
        const booksToShow = Math.min(3, books.length);
        for (let i = 0; i < booksToShow; i++) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            randomBooks.push(randomBook);
        }
        renderBooks(randomBooks);
    }
}

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

renderRandomBooks();
renderCategoryOptions();

const ratings = ["1", "2", "3", "4", "5"];
ratings.forEach(rating => {
    const option = document.createElement('option');
    option.value = rating;
    option.textContent = `${rating}+ Stars`;
    ratingSelect.appendChild(option);
});

document.addEventListener("DOMContentLoaded", function() {
    const booksGrid = document.getElementById("books-grid");
    const books = JSON.parse(localStorage.getItem("books")) || [];

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button class="add-to-shelf" data-title="${book.title}">Add to Shelf</button>
        `;

        booksGrid.appendChild(bookElement);
    });

    booksGrid.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-shelf")) {
            const title = event.target.getAttribute("data-title");
            let shelf = JSON.parse(localStorage.getItem("shelf")) || [];
            const book = books.find(book => book.title === title);
            shelf.push(book);
            localStorage.setItem("shelf", JSON.stringify(shelf));
            alert("Book added to your shelf!");
        }
    });
});
