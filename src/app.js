const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');

const authRouter = require('./routes/auth.router');
const { connectDb } = require('./lib/database');
const session = require('express-session');
const passport = require('passport');
const indexRouter = require('./routes/index.router');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
}));

require('./lib/passport')(passport);

app.use('/js', express.static(path.resolve(__dirname, '../public/dist/')));

app.use(passport.initialize());
app.use('/', indexRouter());
app.use('/auth', authRouter());

const port = process.env.PORT || 3000;
app.listen(port, async () => {
	try {
		const { connection } = await connectDb();
		debug(
			`MongoDB connected on ${connection.host}:${connection.port}/${connection.db.namespace}`
		);
	} catch (err) {
		debug(err);
	}
	debug(`Server running on port ${port}`);
});
