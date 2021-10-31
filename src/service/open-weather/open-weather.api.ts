import axios from "axios";
import { axiosErrorHandler } from "../../utils";
import { weatherConfig } from "../../config"
import { OpenCallApiParameters, OpenCallApiResponse } from "../../models/weather.models"


export class OpenWeatherAPI {

    constructor() {
    }

    public async getWeatherInfoOneCall(openCallParams: OpenCallApiParameters): Promise<OpenCallApiResponse> {
        const url = this.buildExternalApiUrl(openCallParams);
        console.log(`Calling OneCall API with url: ${url}`);
        return await axios.get(url).then(res => {
            return res.data;
        }).catch(error => {
            throw axiosErrorHandler(error);
        })
    }

    private buildExternalApiUrl(openCallParams: OpenCallApiParameters) {
        const exclude = openCallParams.exclude ? openCallParams.exclude: 'minutely,hourly,daily,alerts';
        const lang = openCallParams.lang ? `&lang=${openCallParams.lang}`: '';
        return `${weatherConfig.externalUrl}/onecall?lat=${openCallParams.lat}&lon=${openCallParams.long}&appid=${openCallParams.appid}&units=${openCallParams.units}&exclude=${exclude}${lang}`;
    }
    
}
