const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const app = express();
const port = 3000;

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prajwalrpawar2001@gmail.com', // replace with your email
    pass: 'Prajwal@789' // replace with your email password
  }
});

// Function to send email
async function sendEmail(name, toEmail) {
  const mailOptions = {
    from: 'prajwalrpawar20001@gmail.com',
    to: toEmail,
    subject: 'Form Submission Confirmation',
    html: await generateEmailContent(name)
  };

  return transporter.sendMail(mailOptions);
}

// Function to generate email content using Handlebars
async function generateEmailContent(name) {
  const templatePath = './views/emails/confirmation.handlebars';

  // Read the Handlebars template
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Compile the template
  const compiledTemplate = handlebars.compile(template);

  // Generate HTML content using the compiled template
  return compiledTemplate({ name });
}

// Define a route to render the EJS template
app.get('/', (req, res) => {
  // You can replace these placeholder names with the actual data you want to send
  const placeholderData = {
    field1: 'Prajwal',
    field2: 'Pawar',
    field3: 'prajwalrpawar2001',
    field4: 'manlitics',
    field5: '1-100',
    field6: 'web dev',
    field7: 'it',
    field8: '234328904732094',
    pageTitle: 'Title from the mocklp Title from the mocklp Title from the mocklp Title from the mocklp',
    formHeading1: 'formHeading1',
    formHeading2: 'formHeading2',
    buttontext: 'buttontext',
};

// Render the EJS template and pass the placeholder data
res.render('form', placeholderData);
});

app.get('/form1', (req, res) => {
  res.render('form1');
});

app.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

app.post('/submit', async (req, res) => {
  try {
    // Get form data
    const { name, email } = req.body;
    console.log(name, email);

    // Send email
    await sendEmail(name, email);

    // Render a success page
    res.redirect('/thankyou');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
