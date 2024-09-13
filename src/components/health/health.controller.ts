import { Get, JsonController } from 'routing-controllers'

@JsonController()
export class HealthController {
	@Get('/healthz')
	healthz() {
		const result = {
			status: 'Success',
			message: 'Server is healthy!!',
			body: null
		}
		return result
	}
}
