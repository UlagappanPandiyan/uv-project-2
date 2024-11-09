fetch('http://localhost:3000/check-login')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById('user-info').innerHTML = `Hello, ${data.user.username}`;
        } else {
            window.location.href = 'login.html';  // Redirect to login if not logged in
        }
    });

function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'login.html';  // Redirect to login page after logging out
    });
}
