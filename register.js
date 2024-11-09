document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('registerMessage').textContent = data.message;
        if (data.message === 'User registered successfully') {
            // Redirect to login page
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        document.getElementById('registerMessage').textContent = 'Error registering user.';
    });
});
