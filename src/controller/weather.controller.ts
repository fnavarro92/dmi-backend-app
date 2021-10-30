import { WeatherService } from "../service/weather-service";

async function routes(fastify) {

	const weatherService = new WeatherService();

	fastify.get('/check-temperature', async (req, res) => {
		console.log('checking temperature');
		const response = await weatherService.checkWeather(req.query, req.headers).then(serviceResponse => {
			res.status(200).send(serviceResponse);
		}).catch(error => {
			res.status(error.status).send(error.message);
		});
	});

	// fastify.post('/', async (req, res) => {
	// 	req.log.info('Add products to db');
	// 	const products = await createProduct(req.body);
	// 	res.status(201).send(products);
	// });


}

module.exports = routes;
