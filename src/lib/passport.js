const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/User');
const { compareSync } = require('bcrypt');
const { getRedisConnection } = require('./database');

/**
 *
 * @param {import('passport').PassportStatic} passport
 */
module.exports = async (passport) => {
	const redis = await getRedisConnection();
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				session: true,
			},
			async (username, password, done) => {
				try {
					const user = await User.findOne({ username });
					if (!user) return done(null, false);

					if (compareSync(password, user.password)) {
						return done(null, user);
					}

					return done(null, false);
				} catch (err) {
					return done(err, null);
				}
			}
		)
	);

	passport.serializeUser(async (user, done) => {
		await redis.set(`user_sessions:${user._id}`, JSON.stringify(user));
		return done(null, user._id);
	});

	passport.deserializeUser((id, done) => {});

	return passport;
};
