import { CheckTemperatureQueryParams, CheckTemperatureResponse, OpenCallApiResponse } from "../models/weather.models";
import { OpenWeatherAPI } from "./open-weather/open-weather.api";
import { WeatherService } from "./weather-service";

describe('Weather Service', () => {
	const openWeatherAPI: OpenWeatherAPI = new OpenWeatherAPI;
    const weatherService = new WeatherService(openWeatherAPI);

    const params: CheckTemperatureQueryParams = {
        latitude: '1111',
        longitude: '2222',
        units: 'imperial'
    }

    const wrongParams: CheckTemperatureQueryParams = {
        latitude: '1111',
        units: 'imperial'
    }

    const headers = {
        'x-api-key': 'xxxx'
    }

    const responseMapped: CheckTemperatureResponse = {
        isCold: true,
        temperature: 10.00,
        timezone: 'some test'
    } 

    const openCallApiResponse: OpenCallApiResponse = {
        lat: 1111,
        lon: 2222,
        timezone: 'some test',
        current: {
            temp: 10.00,
            feels_like: 10.00
        }
    }

    const responseMappedNoParams: CheckTemperatureResponse = {
        isCold: false,
        temperature: 30.00,
        timezone: 'some test 2'
    } 

    const openCallApiResponseNoParams: OpenCallApiResponse = {
        lat: -33.122987,
        lon: -64.347757,
        timezone: 'some test 2',
        current: {
            temp: 30.00,
            feels_like: 30.00
        }
    }

    afterEach(() => {
        jest.clearAllMocks();
    });


	test('Should check weather - happy path with parameters - cold', async () => {
		const openWeatherSpy = jest.spyOn(openWeatherAPI, 'getWeatherInfoOneCall').mockResolvedValue(openCallApiResponse);
        const response = await weatherService.checkWeather(params, headers);
        expect(openWeatherSpy).toHaveBeenCalledTimes(1);
        expect(openWeatherSpy).toHaveBeenCalledWith({
            lat: '1111',
            long: '2222',
            units: 'imperial',
            appid: 'xxxx'
        })
        expect(response).toEqual(responseMapped);
	});

    test('Should check weather - happy path without parameters - hot', async () => {
		const openWeatherSpy = jest.spyOn(openWeatherAPI, 'getWeatherInfoOneCall').mockResolvedValue(openCallApiResponseNoParams);
        const response = await weatherService.checkWeather({}, headers);
        expect(openWeatherSpy).toHaveBeenCalledTimes(1);
        expect(openWeatherSpy).toHaveBeenCalledWith({
            lat: '-33.122987',
            long: '-64.347757',
            units: 'metric',
            appid: 'xxxx'
        })
        expect(response).toEqual(responseMappedNoParams);
	});

    test('Should check weather - return error if external API fails', async () => {
		const openWeatherSpy = jest.spyOn(openWeatherAPI, 'getWeatherInfoOneCall').mockRejectedValue({
            status: 500,
            message: 'some message'
        });
        await expect(weatherService.checkWeather({}, headers).catch(err => {
            expect(err).toBeDefined();
            expect(err).toEqual({
                status: 500,
                message: 'some message'
            })
        }))
        expect(openWeatherSpy).toHaveBeenCalledTimes(1);
        expect(openWeatherSpy).toHaveBeenCalledWith({
            lat: '-33.122987',
            long: '-64.347757',
            units: 'metric',
            appid: 'xxxx'
        })
	});

    test('Should check weather - return error if validation is not ok', async () => {
		const openWeatherSpy = jest.spyOn(openWeatherAPI, 'getWeatherInfoOneCall').mockImplementation();
        await weatherService.checkWeather(wrongParams, headers).catch(err => {
            expect(err).toBeDefined();
            expect(err.status).toBe(400);
            expect(err.message).toStrictEqual([ 'instance requires property "longitude"' ]);
        })
        expect(openWeatherSpy).toHaveBeenCalledTimes(0);
	});

});