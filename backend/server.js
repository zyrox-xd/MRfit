const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Configure Nodemailer (using Gmail for demo)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "1sha2arif2@gmail.com",  // replace with your Gmail
        pass: "qfyl hhno qzbw bpvy",    // use Gmail app password (not normal password)
      },
    });

    let mailOptions = {
      from: email,
      to: "1sha2arif2@gmail.com", // where you want to receive messages
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
