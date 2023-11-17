const mongoose = require('mongoose');

const connectDb = async () => {
	return await mongoose.connect(process.env.MONGO_URL, {
    maxIdleTimeMS: 100000,
  });
};

module.exports = { connectDb };
