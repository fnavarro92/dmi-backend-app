export interface CheckTemperatureQueryParams {
    latitude?: string,
    longitude?: string,
    units?: string
}

export interface CheckTemperatureResponse {
    isCold: boolean,
    temperature: number,
    timezone: string
}

export interface OpenCallApiParameters {
    lat: string,
    long: string,
    appid: string,
    units: string,
    lang?: string,
    exclude?: string
}

export interface OpenCallApiResponse {
    lat: number,
    lon: number,
    timezone: string,
    current: OpenCallApiResponseCurrent
}

export interface OpenCallApiResponseCurrent {
    temp: number,
    feels_like: number
}
