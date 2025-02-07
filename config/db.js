const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "roundhouse.proxy.rlwy.net", // Ganti dengan host dari Railway
    user: "root",                      // Username dari Railway
    password: "psNPQAsImdibUnxZhDZrnTfvqOnkvHVA", // Password dari Railway
    database: "railway",               // Nama database
    port: 44106                        // Port dari Railway
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to Railway MySQL database");
});

module.exports = db;
