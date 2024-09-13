import { AirQualityService } from './service'
import cron from 'node-cron';

export class AirQualityJob {
    private airQualityService: AirQualityService

    constructor() {
        this.airQualityService = new AirQualityService()
    }

    async fetchAndStoreAirQuality() {
        const zoneAirQuality = await this.airQualityService.getAirQuality({ lat: 48.856613, lon: 2.352222 })
        await this.airQualityService.addAirQuality(zoneAirQuality)

    }
    async scheduleAirQualityJob() {
        try {
            cron.schedule('* * * * *', () => {
                this.fetchAndStoreAirQuality();
            });

        } catch (error) {
            throw error
        }
    }

}