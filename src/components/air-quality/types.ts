export type GetAirQualityParams = {
    lat: number,
    lon: number
}

export type Pollution = {
    ts: string,
    aqius: number,
    mainus: string,
    aqicn: number,
    maincn: string
}