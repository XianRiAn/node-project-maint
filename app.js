const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where templates are located
app.set('views', './views');


// Use the routers
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Middleware for parsing JSON
// app.use(express.json());

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET - Retrieve all users
app.get('/api/users', (req, res) => {
  res.json(users);
});


// POST - Create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/', (req, res) => {
  
  const data = {
    title: 'Express Template Example',
    message: 'Hello from EJS!',
    items: ['Item 1', 'Item 2', 'Item 3']
  };

  res.render('index', data);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});