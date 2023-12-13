const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 4000;
const uri = 'mongodb://localhost:27017/moneytracker'; // MongoDB database name

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db('moneytracker');

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/transactions', async (req, res) => {
    try {
      const transactions = await db.collection('transactions').find({}).toArray();
      res.json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/add-transaction', async (req, res) => {
    try {
      const { type, amount, description } = req.body;
      const newTransaction = { type, amount, description };
      await db.collection('transactions').insertOne(newTransaction);
      res.status(201).json({ message: 'Transaction added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
