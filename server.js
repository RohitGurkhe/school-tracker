
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== FILE PATH =====
const DATA_FILE = path.join(__dirname, 'data.json');

// ===== INIT FILE =====
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        contributions: [],
        expenses: []
    }, null, 2));
}

// ===== FUNCTIONS =====
function loadData() {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ===== SERVE FRONTEND =====
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-mongodb.html'));
});

// ===== CONTRIBUTIONS =====

// GET
app.get('/api/contributions', (req, res) => {
    try {
        const data = loadData();
        res.json(data.contributions || []);
    } catch (err) {
        console.error(err);
        res.json([]);
    }
});

// POST
app.post('/api/contributions', (req, res) => {
    try {
        const { name, amount } = req.body;

        if (!name || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid data" });
        }

        const data = loadData();

        const newItem = {
            _id: Date.now().toString(),
            name,
            amount: Number(amount),
            date: new Date()
        };

        data.contributions.push(newItem);
        saveData(data);

        res.json(newItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/api/contributions/:id', (req, res) => {
    try {
        const data = loadData();

        data.contributions = data.contributions.filter(
            item => item._id !== req.params.id
        );

        saveData(data);
        res.json({ message: "Deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ===== EXPENSES =====

// GET
app.get('/api/expenses', (req, res) => {
    try {
        const data = loadData();
        res.json(data.expenses || []);
    } catch (err) {
        console.error(err);
        res.json([]);
    }
});

// POST
app.post('/api/expenses', (req, res) => {
    try {
        const { name, amount, paidBy } = req.body;

        if (!name || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid data" });
        }

        const data = loadData();

        const newItem = {
            _id: Date.now().toString(),
            name,
            amount: Number(amount),
            paidBy: paidBy || "Unknown",
            date: new Date()
        };

        data.expenses.push(newItem);
        saveData(data);

        res.json(newItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/api/expenses/:id', (req, res) => {
    try {
        const data = loadData();

        data.expenses = data.expenses.filter(
            item => item._id !== req.params.id
        );

        saveData(data);
        res.json({ message: "Deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ===== SUMMARY =====
app.get('/api/summary', (req, res) => {
    try {
        const data = loadData();

        const totalC = data.contributions.reduce((sum, c) => sum + c.amount, 0);
        const totalE = data.expenses.reduce((sum, e) => sum + e.amount, 0);

        res.json({
            totalContributions: totalC,
            totalExpenses: totalE,
            balance: totalC - totalE
        });

    } catch (err) {
        console.error(err);
        res.json({
            totalContributions: 0,
            totalExpenses: 0,
            balance: 0
        });
    }
});

// ===== CLEAR ALL =====
app.delete('/api/clear-all', (req, res) => {
    try {
        const emptyData = {
            contributions: [],
            expenses: []
        };

        saveData(emptyData);
        res.json({ message: "All data cleared" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ===== SERVER =====
const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
const USERS = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "viewer" }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
        username: user.username,
        role: user.role
    });
});
```javascript
const USERS = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "viewer" }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
        username: user.username,
        role: user.role
    });
});
```
