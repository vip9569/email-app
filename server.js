const express = require('express');
const bodyParser = require('body-parser');
const EmailService = require('./EmailService');

const app = express();
const port = 3000;
const emailService = new EmailService();

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { id, email } = req.body;

  if (!id || !email || !email.to) {
    return res.status(400).json({ error: 'Missing id or email.to' });
  }

  const result = await emailService.send(email, id);
  res.json(result);
});

app.get('/status/:id', (req, res) => {
  const id = req.params.id;
  const status = emailService.getStatus(id);
  res.json({ id, status });
});

app.listen(port, () => {
  console.log(`Email service running at http://localhost:${port}`);
});
