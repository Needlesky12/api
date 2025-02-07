// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    const { nama, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    User.findByEmail(email, async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru
        User.create({ nama, email, password: hashedPassword }, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });

            res.status(201).json({ message: "Registrasi berhasil" });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const user = results[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const token = generateToken(user);
        res.json({ token });
    });
};
