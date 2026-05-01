const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'secret_key'
}));

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.post('/login', (req, res) => {

    const { username, role } = req.body;

    if (!username || !role) {
        return res.send("Please provide username and role");
    }

    req.session.user = {
        username,
        role,
    };

    res.cookie("user", username);

    res.send("Login Successful");
});
app.get('/courses', (req, res) => {

    if (!req.session.user) {
        return res.send("Please login First");
    }

    res.send("You can view Courses");
});

app.get('/create-course', (req, res) => {

    
    if (!req.sesssion.user) {
        return res.send("Please login First");
    }

    res.send("Course Created Successfully");
});

app.get('/profile', (req, res) => {

    if (!req.session.user) {
        return res.send("Please login first");
    }

    res.send(
        `Username: ${req.session.user.username}, Role: ${req.session.user.role}`
    );
});

app.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.clearCookie("connect.sid");

        res.send("Logged out successfully");
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});