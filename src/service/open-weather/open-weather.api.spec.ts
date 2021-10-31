import { OpenCallApiParameters, OpenCallApiResponse } from "../../models/weather.models";
import { OpenWeatherAPI } from "./open-weather.api";
import axios from 'axios';


describe('Weather API', () => {
	const openWeatherAPI: OpenWeatherAPI = new OpenWeatherAPI();

    const params: OpenCallApiParameters = {
        lat: '1111',
        long: '2222',
        units: 'imperial',
        appid: 'xxx'
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

    const axiosResponse = {
        data: openCallApiResponse
    }

    afterEach(() => {
        jest.clearAllMocks();
    });


	test('Should check weather - happy path', async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);
        const response = await openWeatherAPI.getWeatherInfoOneCall(params);
        expect(axiosSpy).toHaveBeenCalledTimes(1);
        expect(response).toEqual(openCallApiResponse);
	});

    test('Should check weather - error 400', async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValue({
            status: 400,
            response: { status: 400, data: 'wrong longitude' }
        });
        await expect(openWeatherAPI.getWeatherInfoOneCall(params)).rejects.toEqual({
            message: '"wrong longitude"', status: 400
        });
        expect(axiosSpy).toHaveBeenCalledTimes(1);
	});
    
});