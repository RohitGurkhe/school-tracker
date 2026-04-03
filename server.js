const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== MONGODB CONNECTION =====
// ❗ IMPORTANT: Put your connection string inside quotes
 const MONGO_URI = "mongodb+srv://rohit:rohit123@cluster0.dsu4l.mongodb.net/schoolDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// ===== SCHEMAS =====
const contributionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, default: "Unknown" },
    date: { type: Date, default: Date.now }
});

// ===== MODELS =====
const Contribution = mongoose.model('Contribution', contributionSchema);
const Expense = mongoose.model('Expense', expenseSchema);

// ===== LOGIN =====
const USERS = [
    { username: "admin", password: "Demo@2511", role: "admin" }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(user);
});

// ===== CONTRIBUTIONS =====

// GET
app.get('/api/contributions', async (req, res) => {
    try {
        const data = await Contribution.find().sort({ date: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
app.post('/api/contributions', async (req, res) => {
    try {
        const { name, amount } = req.body;

        if (!name || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid data" });
        }

        const newData = new Contribution({
            name,
            amount: Number(amount)
        });

        await newData.save();
        res.json(newData);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== EXPENSES =====

// GET
app.get('/api/expenses', async (req, res) => {
    try {
        const data = await Expense.find().sort({ date: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
app.post('/api/expenses', async (req, res) => {
    try {
        const { name, amount, paidBy } = req.body;

        if (!name || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid data" });
        }

        const newData = new Expense({
            name,
            amount: Number(amount),
            paidBy
        });

        await newData.save();
        res.json(newData);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== SUMMARY =====
app.get('/api/summary', async (req, res) => {
    try {
        const contributions = await Contribution.find();
        const expenses = await Expense.find();

        const totalC = contributions.reduce((s, x) => s + x.amount, 0);
        const totalE = expenses.reduce((s, x) => s + x.amount, 0);

        res.json({
            totalContributions: totalC,
            totalExpenses: totalE,
            balance: totalC - totalE
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== STATIC FILES =====
app.use(express.static(__dirname));

// ===== SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

//===== DELETE CONTRIBUTION =====

app.delete('/api/contributions/:id', async (req, res) => {
    try {
        await Contribution.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//===== DELETE EXPENSE =====

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});