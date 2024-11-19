document.addEventListener("DOMContentLoaded", () => {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');  // Получаем название книги из query string

    if (!title) {
        // Если параметр title не передан, показываем ошибку
        console.error("No book title found in the URL.");
        document.getElementById('book-preview').innerHTML = '<p>Error: No book title provided in the URL.</p>';
        return;
    }

    // Загружаем данные о книгах
    fetch('/datahere/databooks.csv')  // Убедитесь, что путь к файлу правильный
        .then(response => response.text())
        .then(csvData => {
            const parsedData = Papa.parse(csvData, {
                header: true,  // Применяем заголовки
                skipEmptyLines: true,  // Пропускаем пустые строки
            });

            const books = parsedData.data; // Все книги

            console.log('Parsed Books:', books); // Проверка загрузки

            // Ищем книгу по названию
            const book = books.find(b => b.title === title);

            if (book) {
                // Если книга найдена, отображаем информацию
                document.getElementById('book-title').textContent = book.title;
                document.getElementById('book-author').textContent = `Author: ${book.author}`;
                document.getElementById('book-category').textContent = `Category: ${book.category}`;
            } else {
                // Если книга не найдена, показываем сообщение
                console.error('Book not found:', title);
                document.getElementById('book-preview').innerHTML = '<p>Book not found in the database.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
            document.getElementById('book-preview').innerHTML = '<p>Failed to load book data.</p>';
        });
});
