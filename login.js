// NOTE: Modules and setups
const express = require('express');
  const app = express();

const mustacheExpress = require('mustache-express');
  app.engine('mustache', mustacheExpress());                  // app.engine(extension, template engine callback)
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/views');                     // in application settings there are 'views' and 'view engine' properties that are configurable with app.set()

const session = require('express-session');
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static('public'));

let users = { 'user': 'Poopy', 'password': 'Poop'};
// console.log(users.user)

app.get('/', (req, res) => {
  console.log(req.session.views);
  if(req.session.views >= 1){
    req.session.views++
    res.render('index', { 'users': users.user});
} else {
    res.redirect('/login');
}});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(username == users.user && password == users.password){
    req.session.views = 1;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.post('/', (req, res) => {
  if (req.body.logout){
    res.redirect('/login');
  } else {
  res.render('index', { 'users': users.user});
}});

app.listen(3000, () => console.log('Mamamoo: Decalomanie' ));
