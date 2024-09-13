import { AirQualityRepository } from './repository'
import { GetAirQualityParams, Pollution } from './types'

export class AirQualityService {
    private airQualityRepository: AirQualityRepository

    constructor() {
        this.airQualityRepository = new AirQualityRepository()
    }

    async getAirQuality({ lat, lon }: GetAirQualityParams) {
        const queryString = `&lat=${lat}&lon=${lon}`
        return await this.airQualityRepository.getAirQuality(queryString)
    }

    async addAirQuality(pollution: Pollution) {
        await this.airQualityRepository.addAirQuality(pollution)
    }

    async getParisMostPollutedDateTime() {
        const mostPollutedRecord = await this.airQualityRepository.getParisMostPollutedDateTime()
        return mostPollutedRecord.ts
    }
}