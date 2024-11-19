// document.getElementById('login-form').addEventListener('submit', function(event) {
//   event.preventDefault();  // Останавливаем стандартное поведение формы (перезагрузку)

//   const email = event.target.email.value.trim();  // Убираем лишние пробелы
//   const password = event.target.password.value.trim();

//   // Выводим введенные данные для отладки
//   console.log("Submitted email:", email);
//   console.log("Submitted password:", password);

//   // Проверяем правильность введенных данных
//   if (email === 'user@example.com' && password === 'password123') {
//     console.log('Login successful!');
//     window.location.href = '/htmL/index.html';  // Перенаправление на главную страницу (путь к вашему файлу)
//   } else {
//     console.log('Invalid credentials');
//     alert('Invalid credentials. Please try again.');  // Выводим сообщение об ошибке
//   }
// });
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Останавливаем стандартное поведение формы (перезагрузку)

  const email = event.target.email.value.trim(); // Убираем пробелы
  const password = event.target.password.value.trim(); // Убираем пробелы

  // Проверка: в почте должно быть @gmail.com
  if (!email.includes('@gmail.com')) {
    alert('The email must include @gmail.com');
    return; // Прерываем выполнение, если почта некорректна
  }

  // Проверка: пароль должен быть длиной более 3 символов
  if (password.length <= 3) {
    alert('The password must be longer than 3 characters');
    return; // Прерываем выполнение, если пароль слишком короткий
  }

  // Если все проверки пройдены
  alert('Login successful!');
  window.location.href = '/htmL/index.html'; // Перенаправление на домашнюю страницу
});
