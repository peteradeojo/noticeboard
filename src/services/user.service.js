const { hashSync, compareSync } = require('bcrypt');
const User = require('../models/User');

class UserService {
	constructor() {}

	async createUser(data) {
		const user = new User(data);
		user.password = hashSync(data.password, parseInt(process.env.SALTS));

		if (user) {
			await user.save();
			return user;
		}
	}

	async authenticateUser(username, password) {
		const user = await User.findOne({ username });

    if (!user) {
      return false;
    }

    if (compareSync(password, user.password)) {
      return true;
    }

    return false;
	}
}

module.exports = UserService;
