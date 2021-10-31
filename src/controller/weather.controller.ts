import { WeatherService } from "../service/weather-service";

async function routes(fastify) {

	const weatherService = new WeatherService();

	fastify.get('/check-temperature', async (req, res) => {
		console.log('checking temperature');
		await weatherService.checkWeather(req.query, req.headers).then(serviceResponse => {
			res.status(200).send(serviceResponse);
		}).catch(error => {
			res.status(error.status).send(error.message);
		});
	});

}

module.exports = routes;
