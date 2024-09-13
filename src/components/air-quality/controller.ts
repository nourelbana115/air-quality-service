import { JsonController, Get, QueryParams, BadRequestError } from 'routing-controllers'
import { AirQualityService } from './service'
import { GetAirQualityParams } from './types'

@JsonController('/quality')
export class AirQualityController {
	private readonly airQualityService: AirQualityService
	constructor() {
		this.airQualityService = new AirQualityService()
	}

	@Get()
	async getAirQualityByZone(@QueryParams() params: GetAirQualityParams) {
		const Pollution = await this.airQualityService.getAirQuality(params).catch(e => { throw e })
		return {
			Result: {
				Pollution
			}
		}
	}

	@Get('/most-polluted')
	async getParisMostPollutedDateTime() {
		const MostPollutedTime = await this.airQualityService.getParisMostPollutedDateTime().catch(e => { throw e })
		return {
			Result: {
				MostPollutedTime
			}
		}
	}
}
