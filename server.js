const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const errorResponse = require('./middleware/error');
const PORT = process.env.PORT || 5000;
const path = require('path');

//Connecting database:
db();

const users = require('./routes/users');
const auth = require('./routes/auth');
const quote = require('./routes/quote');
const post = require('./routes/posts');
const upload = require('./routes/upload');

app.use(express.json());

app.use(morgan('combined'));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(fileupload());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/quote', quote);
app.use('/api/post', post);
app.use('/api/upload', upload);

app.use(errorResponse);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API running on PORT= ${PORT}`);
});
