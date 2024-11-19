document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = event.target.email.value.trim(); 
  const password = event.target.password.value.trim();

  if (!email.includes('@gmail.com')) {
    alert('The email must include @gmail.com');
    return;
  }

  if (password.length <= 3) {
    alert('The password must be longer than 3 characters');
    return;
  }

  alert('Login successful!');
  window.location.href = '/htmL/index.html';
});
