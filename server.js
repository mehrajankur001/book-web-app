if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require("express");
const app = express();

app.use(express.urlencoded({ limit: '10mb', extended: false }));

const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log("Connected to Mongoose"));

//Routes
const indexRouter = require('./router/index');
app.use('/', indexRouter);

const authorRouter = require('./router/authors');
app.use('/authors', authorRouter);

const bookRouter = require('./router/books');
app.use('/books', bookRouter);


app.listen(process.env.PORT || 3000);