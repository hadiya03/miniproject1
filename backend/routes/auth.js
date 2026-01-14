



/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ---------------------------
// GMAIL TRANSPORTER
// ---------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "miniproject783@gmail.com",   // your Gmail
    pass: "wwgaucxltubvfwbw",           // <-- your App Password
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = ?`;
  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp); // <-- Check OTP before insert

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES (?, ?, ?, ?, 0)
    `;

    db.query(insertSql, [name, email, hashedPassword, otp], (err2, result2) => {
      if (err2) {
        console.log("Insert Error:", err2);
        return res.status(500).json({ success: false, message: "Insert error" });
      }

      console.log("User inserted with OTP:", otp); // Confirm insert

      // Email content
      const mailOptions = {
        from: "miniproject783@gmail.com",
        to: email,
        subject: "Your OTP Verification Code",
        text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
      };

      // Send OTP email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
          return res.json({ success: false, message: "OTP email failed" });
        }

        console.log("Email sent:", info.response);
        res.json({
          success: true,
          message: "Registered! OTP sent to your email.",
        });
      });
    });
  });
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND otp = ?`;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?`;

    db.query(updateSql, [email], (err2) => {
      if (err2) {
        console.log("Update Error:", err2);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      res.json({ success: true, message: "OTP verified! You can now login." });
    });
  });
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    if (user.is_verified === 0) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;*/



/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ---------------------------
// GMAIL TRANSPORTER
// ---------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "miniproject783@gmail.com",   // your Gmail
    pass: "wwgaucxltubvfwbw",  // <-- your App Password
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = ?`;
  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES (?, ?, ?, ?, 0)
    `;

    db.query(insertSql, [name, email, hashedPassword, otp], (err2) => {
      if (err2) {
        console.log("Insert Error:", err2);
        return res.status(500).json({ success: false, message: "Insert error" });
      }

      // Email content
      const mailOptions = {
        from: "miniproject783@gmail.com",
        to: email,
        subject: "Your OTP Verification Code",
        text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
      };

      // Send OTP email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
          return res.json({ success: false, message: "OTP email failed" });
        }

        console.log("Email sent:", info.response);
        res.json({
          success: true,
          message: "Registered! OTP sent to your email.",
        });
      });
    });
  });
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND otp = ?`;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // ✅ Keep OTP in table after verification
    const updateSql = `UPDATE users SET is_verified = 1 WHERE email = ?`;

    db.query(updateSql, [email], (err2) => {
      if (err2) {
        console.log("Update Error:", err2);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      res.json({ success: true, message: "OTP verified! You can now login." });
    });
  });
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    if (user.is_verified === 0) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;*/


/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ---------------------------
// RELIABLE GMAIL TRANSPORTER
// ---------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // explicit host
  port: 465,              // SSL port
  secure: true,
  auth: {
    user: "miniproject783@gmail.com",   // your Gmail
    pass: "wwgaucxltubvfwbw",           // your App Password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = ? AND is_verified = 1`;
  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES (?, ?, ?, ?, 0)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp), password = VALUES(password), name = VALUES(name)
    `;

    db.query(insertSql, [name, email, hashedPassword, otp], (err2) => {
      if (err2) {
        console.log("Insert Error:", err2);
        return res.status(500).json({ success: false, message: "Insert error" });
      }

      // Email content
      const mailOptions = {
        from: "miniproject783@gmail.com",
        to: email,
        subject: "Your OTP Verification Code",
        text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
      };

      // Send OTP email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
          return res.json({ success: false, message: "OTP email failed" });
        }

        console.log("Email sent:", info.response);
        res.json({
          success: true,
          message: "Registered! OTP sent to your email.",
        });
      });
    });
  });
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND otp = ?`;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?`;

    db.query(updateSql, [email], (err2) => {
      if (err2) {
        console.log("Update Error:", err2);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      res.json({ success: true, message: "OTP verified! You can now login." });
    });
  });
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    if (user.is_verified === 0) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;*/



/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ---------------------------
// RELIABLE GMAIL TRANSPORTER (FIXED)
// ---------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,                 // FIXED (was 465)
  secure: false,             // FIXED (must be false for port 587)
  requireTLS: true,          // Required for Gmail TLS
  auth: {
    user: "miniproject783@gmail.com",
    pass: "wwgaucxltubvfwbw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = ? AND is_verified = 1`;
  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert or update unverified user
    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES (?, ?, ?, ?, 0)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp), password = VALUES(password), name = VALUES(name)
    `;

    db.query(insertSql, [name, email, hashedPassword, otp], (err2) => {
      if (err2) {
        console.log("Insert Error:", err2);
        return res.status(500).json({ success: false, message: "Insert error" });
      }

      const mailOptions = {
        from: "miniproject783@gmail.com",
        to: email,
        subject: "Your OTP Verification Code",
        text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
          return res.json({ success: false, message: "OTP email failed" });
        }

        console.log("Email sent:", info.response);
        res.json({
          success: true,
          message: "Registered! OTP sent to your email.",
        });
      });
    });
  });
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND otp = ?`;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?`;

    db.query(updateSql, [email], (err2) => {
      if (err2) {
        console.log("Update Error:", err2);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      res.json({ success: true, message: "OTP verified! You can now login." });
    });
  });
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    if (user.is_verified === 0) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;*/

/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ---------------------------
// RELIABLE GMAIL TRANSPORTER (FIXED)
// ---------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "miniproject783@gmail.com",
    pass: "wwgaucxltubvfwbw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = ? AND is_verified = 1`;
  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES (?, ?, ?, ?, 0)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp), password = VALUES(password), name = VALUES(name)
    `;

    db.query(insertSql, [name, email, hashedPassword, otp], (err2) => {
      if (err2) {
        console.log("Insert Error:", err2);
        return res.status(500).json({ success: false, message: "Insert error" });
      }

      const mailOptions = {
        from: "miniproject783@gmail.com",
        to: email,
        subject: "Your OTP Verification Code",
        text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
          return res.json({ success: false, message: "OTP email failed" });
        }

        console.log("Email sent:", info.response);
        res.json({
          success: true,
          message: "Registered! OTP sent to your email.",
        });
      });
    });
  });
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND otp = ?`;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // ✔ FIX: OTP WILL NOT BE SET TO NULL ANYMORE
    const updateSql = `UPDATE users SET is_verified = 1 WHERE email = ?`;

    db.query(updateSql, [email], (err2) => {
      if (err2) {
        console.log("Update Error:", err2);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      res.json({ success: true, message: "OTP verified! You can now login." });
    });
  });
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    if (user.is_verified === 0) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;*/











/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Gmail transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "miniproject783@gmail.com",
    pass: "wwgaucxltubvfwbw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = $1 AND is_verified = 1`;

  try {
    const result = await db.query(checkSql, [email]);

    if (result.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);

    // PostgreSQL version of UPSERT
    const insertSql = `
      INSERT INTO users (name, email, password, otp, is_verified)
      VALUES ($1, $2, $3, $4, 0)
      ON CONFLICT (email)
      DO UPDATE SET 
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        otp = EXCLUDED.otp
    `;

    await db.query(insertSql, [name, email, hashedPassword, otp]);

    const mailOptions = {
      from: "miniproject783@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email Error:", error);
        return res.json({ success: false, message: "OTP email failed" });
      }

      console.log("Email sent:", info.response);
      res.json({
        success: true,
        message: "Registered! OTP sent to your email.",
      });
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1 AND otp = $2`;

  try {
    const result = await db.query(sql, [email, otp]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1 WHERE email = $1`;

    await db.query(updateSql, [email]);

    res.json({ success: true, message: "OTP verified! You can now login." });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1`;

  try {
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;*/










/*const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Gmail transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "miniproject783@gmail.com",
    pass: "wwgaucxltubvfwbw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password, role } = req.body; // ✅ role added

  const checkSql = `SELECT * FROM users WHERE email = $1 AND is_verified = 1`;

  try {
    const result = await db.query(checkSql, [email]);

    if (result.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);

    // PostgreSQL UPSERT with role
    const insertSql = `
      INSERT INTO users (name, email, password, role, otp, is_verified)
      VALUES ($1, $2, $3, $4, $5, 0)
      ON CONFLICT (email)
      DO UPDATE SET 
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        otp = EXCLUDED.otp
    `;

    await db.query(insertSql, [
      name,
      email,
      hashedPassword,
      role,
      otp,
    ]);

    const mailOptions = {
      from: "miniproject783@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email Error:", error);
        return res.json({ success: false, message: "OTP email failed" });
      }

      console.log("Email sent:", info.response);
      res.json({
        success: true,
        message: "Registered! OTP sent to your email.",
      });
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1 AND otp = $2`;

  try {
    const result = await db.query(sql, [email, otp]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1 WHERE email = $1`;

    await db.query(updateSql, [email]);

    res.json({ success: true, message: "OTP verified! You can now login." });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1`;

  try {
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ role returned
      },
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;*/








const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ✅ FIXED Gmail transporter (ONLY THIS PART CHANGED)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "miniproject783@gmail.com",
    pass: "wwgaucxltubvfwbw", // Gmail App Password
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// ---------------------------
// REGISTER → /s (send OTP)
// ---------------------------
router.post("/s", async (req, res) => {
  const { name, email, password, role } = req.body;

  const checkSql = `SELECT * FROM users WHERE email = $1 AND is_verified = 1`;

  try {
    const result = await db.query(checkSql, [email]);

    if (result.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = `
      INSERT INTO users (name, email, password, role, otp, is_verified)
      VALUES ($1, $2, $3, $4, $5, 0)
      ON CONFLICT (email)
      DO UPDATE SET 
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        otp = EXCLUDED.otp
    `;

    await db.query(insertSql, [
      name,
      email,
      hashedPassword,
      role,
      otp,
    ]);

    const mailOptions = {
      from: "miniproject783@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nEnter this OTP to verify your email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email Error:", error);
        return res.json({ success: false, message: "OTP email failed" });
      }

      console.log("Email sent:", info.response);
      res.json({
        success: true,
        message: "Registered! OTP sent to your email.",
      });
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// VERIFY OTP → /verify-otp
// ---------------------------
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1 AND otp = $2`;

  try {
    const result = await db.query(sql, [email, otp]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const updateSql = `UPDATE users SET is_verified = 1 WHERE email = $1`;
    await db.query(updateSql, [email]);

    res.json({ success: true, message: "OTP verified! You can now login." });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// LOGIN → /l
// ---------------------------
router.post("/l", async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = $1`;

  try {
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("DB Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

