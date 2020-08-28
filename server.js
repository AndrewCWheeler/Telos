const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
// const port = 8000;
const cookieParser = require('cookie-parser');
const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 8000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!itisasecret',
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

require('dotenv').config();
require('./server/config/mongoose.config');

const IN_PROD = NODE_ENV === 'production';

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/task.routes')(app);
require('./server/routes/user.routes')(app);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
