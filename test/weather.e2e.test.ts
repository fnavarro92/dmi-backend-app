
describe('Weather API', () => {
	let server;

	beforeAll(async () => {
		server = await require('../src/index');
	});


	afterAll(async () => {
		server.close();
	});


	test('Get check temperature /check-temperature happy path', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/weather/check-temperature',
			headers: {
				'x-api-key': '7881f5239ea9987d0c31e0ffcee85605'
			}
		});
		expect(response.statusCode).toBe(200);
	});

	test('Get check temperature /check-temperature can accept parameters', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/weather/check-temperature?latitude=59.911111&longitude=10.752778&units=imperial',
			headers: {
				'x-api-key': '7881f5239ea9987d0c31e0ffcee85605'
			}
		});
		expect(response.statusCode).toBe(200);
	});

	test('Get check temperature /check-temperature should fail if only latitude is sent', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/weather/check-temperature?latitude=59.911111'
		});
		expect(response.statusCode).toBe(400);
	});

	test('Get check temperature /check-temperature should fail if only longitude is sent', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/weather/check-temperature?longitude=59.911111'
		});
		expect(response.statusCode).toBe(400);
	});

	test('Get check temperature /check-temperature should not accept additional parameters', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/weather/check-temperature?notValid=59.911111'
		});
		expect(response.statusCode).toBe(400);
	});

});