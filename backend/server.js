const express = require('express');

const products = require('./data/products');

const port = 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, console.log(`Server listening on ${port}`));
