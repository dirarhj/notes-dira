const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Notes jalan!');
});

// ================== CRUD ==================

// CREATE
app.post('/notes', (req, res) => {
    const { judul, isi } = req.body;
    const sql = 'INSERT INTO notes (judul, isi) VALUES (?, ?)';
    db.query(sql, [judul, isi], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Catatan berhasil ditambahkan' });
    });
});

// READ
app.get('/notes', (req, res) => {
    db.query('SELECT * FROM notes', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// UPDATE
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { judul, isi } = req.body;
    const sql = 'UPDATE notes SET judul=?, isi=? WHERE id=?';
    db.query(sql, [judul, isi, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Catatan berhasil diupdate' });
    });
});

// DELETE
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM notes WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Catatan berhasil dihapus' });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});