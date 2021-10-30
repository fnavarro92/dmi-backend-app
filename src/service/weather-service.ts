import { weatherConfig } from "../config";
import { CheckTemperatureQueryParams, OpenCallApiParameters, OpenCallApiResponse } from "../models/weather.models";
import { CheckTemperatureResponse } from "../models/weather.models";
import { OpenWeatherAPI } from "./open-weather/open-weather.api";

export class WeatherService {
    private openWeatherAPI: OpenWeatherAPI;
    private coldLimitList = {
        metric: 15,
        imperial: 59,
        standard: 288.15
    }

    constructor(openWeatherAPI?: OpenWeatherAPI) {
        this.openWeatherAPI = openWeatherAPI ? openWeatherAPI : new OpenWeatherAPI();
    }

    public async checkWeather(checkWeatherQuery: CheckTemperatureQueryParams, headers: any): Promise<CheckTemperatureResponse> {
        console.log("Executing check weather service");
        const openCallParams: OpenCallApiParameters = {
            lat: checkWeatherQuery.latitude ? checkWeatherQuery.latitude : weatherConfig.dafaultLatitude,
            long: checkWeatherQuery.longitude ? checkWeatherQuery.longitude : weatherConfig.defaultLongitude,
            units: checkWeatherQuery.units ? checkWeatherQuery.units : 'metric',
            appid: headers['x-api-key']
        }
        return this.openWeatherAPI.getWeatherInfoOneCall(openCallParams).then((res: OpenCallApiResponse) => {
            return this.mapResponse(res, openCallParams.units);
        }).catch(err => {
            console.error("Call to oneCall API failed");
            console.error(err);
            throw err;
        })
    }

    private mapResponse (oneCallApiResponse: OpenCallApiResponse, units: string): CheckTemperatureResponse {
        console.log("mapping response");
        const coldLimit = this.coldLimitList[units];
        return {
            isCold: oneCallApiResponse.current.temp > coldLimit ? false: true,
            temperature: oneCallApiResponse.current.temp,
            timezone: oneCallApiResponse.timezone
        }
    }
}