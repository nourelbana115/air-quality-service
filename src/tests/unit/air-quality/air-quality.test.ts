import { AirQualityRepository } from '../../../components/air-quality/repository';
import { AirQualityService } from '../../../components/air-quality/service'
import { Pollution } from '../../../components/air-quality/types'
import { airQualityStub } from './air-quality.stub'


describe('Air quality', () => {
    describe('getAirQualityByZone', () => {
        let airQualityService: AirQualityService
        let mockAirQualityRepository: jest.Mocked<AirQualityRepository>
        beforeEach(() => {
            airQualityService = new AirQualityService()
            mockAirQualityRepository = airQualityService['airQualityRepository'] as jest.Mocked<AirQualityRepository>
        })

        afterEach(() => {
            jest.clearAllMocks()
        })
        describe('Given getAirQualityByZone called', () => {
            describe('when passing lat and lon params', () => {
                let airQuality: Pollution
                beforeAll(async () => {
                    jest.restoreAllMocks();
                    jest.spyOn(AirQualityRepository.prototype, 'getAirQuality')
                        .mockResolvedValue(airQualityStub.data);
                    airQuality = await new AirQualityService().getAirQuality(airQualityStub.zone)
                });
                describe('then', () => {
                    it('should call getAirQuality repo with the correct query string', () => {
                        expect(mockAirQualityRepository.getAirQuality).toHaveBeenCalledWith(`&lat=${airQualityStub.zone.lat}&lon=${airQualityStub.zone.lon}`);
                    });

                    it('should return the correct object result', () => {
                        expect(airQuality).toBe(airQualityStub.data);
                    });

                })
            });
        });

        describe('Given addAirQuality called', () => {
            describe('when passing correct data to add to db', () => {
                beforeAll(async () => {
                    jest.restoreAllMocks();
                    jest.spyOn(AirQualityRepository.prototype, 'addAirQuality')
                        .mockResolvedValueOnce(undefined);
                    await new AirQualityService().addAirQuality(airQualityStub.data)
                });
                describe('then', () => {
                    it('should call addAirQuality repo with the data', () => {
                        expect(mockAirQualityRepository.addAirQuality).toHaveBeenCalledWith(airQualityStub.data);
                    });

                })
            });
        });
        describe('Given getParisMostPollutedDateTime called', () => {
            describe('when ', () => {
                let dateTime: string
                beforeAll(async () => {
                    jest.restoreAllMocks();
                    jest.spyOn(AirQualityRepository.prototype, 'getParisMostPollutedDateTime')
                        .mockResolvedValue(airQualityStub.data);
                    dateTime = await new AirQualityService().getParisMostPollutedDateTime()
                });
                describe('then', () => {
                    it('should return the right dateTime value', () => {
                        expect(dateTime).toBe(airQualityStub.data.ts);
                    });
                })
            });
        });
    })
});