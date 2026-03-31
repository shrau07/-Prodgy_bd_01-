const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

let users = [];

// CREATE
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ message: "All fields required" });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        age
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// READ ALL
app.get('/users', (req, res) => {
    res.json(users);
});

// READ ONE
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { name, email, age } = req.body;

    if (email && !email.includes('@')) {
        return res.status(400).json({ message: "Invalid email" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "User deleted" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});