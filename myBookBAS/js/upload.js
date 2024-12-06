const uploadForm = document.getElementById('upload-form');
const uploadTitle = document.getElementById('upload-title');
const uploadAuthor = document.getElementById('upload-author');
const uploadCategory = document.getElementById('upload-category');
const uploadCover = document.getElementById('upload-cover');
const addToShelfButton = document.getElementById('add-to-shelf-btn');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const book = {
            id: Date.now(),
            title: uploadTitle.value,
            author: uploadAuthor.value,
            category: uploadCategory.value,
            cover: event.target.result,
            description: 'Описание отсутствует'
        };

        let uploadedBooks = JSON.parse(localStorage.getItem('uploadedBooks')) || [];
        uploadedBooks.push(book);
        localStorage.setItem('uploadedBooks', JSON.stringify(uploadedBooks));
        
        alert('Книга успешно загружена!');
        uploadForm.reset();
    };

    reader.readAsDataURL(uploadCover.files[0]);
});

addToShelfButton.addEventListener('click', () => {
    const book = {
        id: Date.now(),
        title: uploadTitle.value,
        author: uploadAuthor.value,
        category: uploadCategory.value,
        cover: uploadCover.files[0] ? URL.createObjectURL(uploadCover.files[0]) : '/images/default-cover.jpg', // Локальный путь к изображению или заглушка
        description: 'Описание отсутствует'
    };

    let shelf = JSON.parse(localStorage.getItem('myShelf')) || [];
    if (!shelf.some(b => b.title === book.title)) {
        shelf.push(book);
        localStorage.setItem('myShelf', JSON.stringify(shelf));
        alert('Книга добавлена на вашу полку!');
    } else {
        alert('Эта книга уже на вашей полке.');
    }
});
