const fastify = require('fastify')();

const createServer  = async () => {

	await fastify.register(require('fastify-cors'));

	await fastify.register(require('../src/controller/weather.controller'), { prefix: '/weather' });

	fastify.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return fastify;
};

module.exports = createServer;
