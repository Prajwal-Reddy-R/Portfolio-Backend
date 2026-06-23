const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,                  // Secure SSL Port allowed by hosting providers
    secure: true,               // True for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your 16-character App Password (no spaces)
    },
    tls: {
        rejectUnauthorized: false // Prevents Render container handshake issues
    }
});

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Save to MongoDB
        const contact = new Contact({ name, email, message });
        await contact.save();

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent and saved successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
});

module.exports = router;


// const express = require('express');
// const nodemailer = require('nodemailer');
// const Contact = require('../models/Contact');
// require('dotenv').config();

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// router.post('/', async (req, res) => {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//         // Save to MongoDB
//         const contact = new Contact({ name, email, message });
//         await contact.save();

//         // Send email
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: `New Contact Form Submission from ${name}`,
//             text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Message sent and saved successfully!' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'An error occurred. Please try again.' });
//     }
// });

// module.exports = router;


