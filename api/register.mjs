const bcrypt = require('bcrypt');
const db = require('../utils/db.mjs');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed'});
    }
}

const{ email, password } = req.body;

try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email,hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ error: 'Error creating user'});
            res.status(201).json({ message: 'User registered successfully'});
        }

    );
}   catch(error) {
    res.status(500).json({ error: 'Internal server error'})
    
}