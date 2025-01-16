const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db.mjs');

export default async function handler(req, res){
    if (req.method !== 'Post') {
        return res.status(405).json({ error: 'Method not allowed'});
    }
}
const { email, password } = req.body;

db.query ('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error'});
    
    if (result.length === 0) {
        return res.status(404).json({ error: 'User not found'});
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials'});
    }
    const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(200).json({message: 'Login succesfull', token});
});
