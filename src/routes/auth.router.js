const router = require('express').Router();

const User = require('../models/User');
const UserService = require('../services/user.service');

const userService = new UserService();
module.exports = () => {
	router
		.route('/login')
		.get((req, res) => {
			return res.render('auth/login');
		})
		.post(async (req, res) => {
			try {
				if (
					userService.authenticateUser(req.body.username, req.body.password)
				) {
					return res.redirect('/browse');
				}
				return res.redirect('/auth/login');
			} catch (err) {
				return res.redirect('/auth/login');
			}
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
