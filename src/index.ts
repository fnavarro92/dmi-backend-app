const server = require('./server');

const init = async () => {
	const fastify = await server();
  
	fastify.listen(8080, (err, address) => {
		if (err) throw err;
		console.log(`fastify 🚀 server listening on ${address}`);
	});

	return fastify;
};

module.exports = init();
