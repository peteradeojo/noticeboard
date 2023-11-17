const router = require('express').Router();
const passport = require('passport');

const User = require('../models/User');
const UserService = require('../services/user.service');

const userService = new UserService();
module.exports = () => {
	router
		.route('/login')
		.get((req, res) => {
			return res.render('auth/login');
		})
		.post((req, res, next) => {
			// return res.redirect('/browse');
			passport.authenticate('local', {
				session: true,
				failureRedirect: '/auth/login',
				failureMessage: true,
				successRedirect: '/browse',
			})(req, res, next);
		});

	// Registration
	router
		.route('/register')
		.get((req, res) => {
			return res.render('auth/register');
		})
		.post(async (req, res) => {
			const { name, username, password } = req.body;
			try {
				await userService.createUser({ name, username, password });
				return res.redirect('/auth/login');
			} catch (err) {
				debug(err);
			}
		});

	return router;
};
