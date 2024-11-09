document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginMessage').textContent = data.message;
            // Redirect to home or dashboard
            window.location.href = 'home.html';  // Adjust to your home/dashboard page
        } else {
            document.getElementById('loginMessage').textContent = data.message;
        }
    })
    .catch(error => {
        document.getElementById('loginMessage').textContent = 'Error logging in.';
    });
});
