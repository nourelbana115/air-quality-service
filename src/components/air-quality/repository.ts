import axiosCall from '../../common/network';
import { Pollution } from './types'
import { AirQuality } from './model'

export class AirQualityRepository {
    async getAirQuality(query: string): Promise<Pollution> {
        try {
            const config = {
                method: 'get',
                url: `${process.env.BASE_URL}/v2/nearest_city?key=${process.env.API_KEY}${query}`,
            };
            const response = await axiosCall<any>(config)
            return response.data.data.current.pollution
        } catch (e) {
            throw new Error(e?.response?.data ?? e.message)
        }
    }

    async addAirQuality(pollution: Pollution): Promise<void> {
        const newAirQuality = new AirQuality(pollution)
        await newAirQuality.save()
    }

    async getParisMostPollutedDateTime(): Promise<Pollution> {
        const result = await AirQuality.findOne({}, { _id: 0 })
            .sort({ 'AirQuality.aqius': -1 })
            .lean()
        return result;
    }
}