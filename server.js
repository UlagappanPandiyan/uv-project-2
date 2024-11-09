const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Session Setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true in production with HTTPS
}));

// PostgreSQL connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce_db', // Replace with your actual DB name
    password: 'Joker123#', // Replace with your actual DB password
    port: 5432,
});

client.connect();

// Register a new user (hash password before storing)
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const values = [username, email, hashedPassword];

        client.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send('Error registering user');
            }
            res.json({ message: 'User registered successfully' });
        });
    });
});

// Login route (check hashed password)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];

    client.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching user data');
        }

        if (result.rows.length === 0) {
            return res.json({ success: false, message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords');
            }

            if (isMatch) {
                // Save user info to session
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid username or password' });
            }
        });
    });
});

// Check if user is logged in
app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// Logout route (destroy session)
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
