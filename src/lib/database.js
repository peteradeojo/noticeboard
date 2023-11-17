const Redis = require('ioredis');
// import Redis from 'ioredis';
const mongoose = require('mongoose');

const connectDb = async () => {
	return await mongoose.connect(process.env.MONGO_URL, {
		maxIdleTimeMS: 100000,
	});
};

let instance;
/**
 *
 * @returns {Redis.Redis} redisConnection
 */
const getRedisConnection = async () => {
	if (instance) {
		return instance;
	}

	try {
    instance = new Redis('redis://127.0.0.1:6379/0', {
      // lazyConnect: true,
    });
		// await instance.connect();
		// console.log('Redis connected successfully');
	} catch (err) {
		console.error(err);
	}
	return instance;
};

module.exports = { connectDb, getRedisConnection };
