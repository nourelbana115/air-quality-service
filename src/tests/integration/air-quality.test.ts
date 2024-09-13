import 'reflect-metadata'; // Import reflect-metadata for decorators
import request from 'supertest';
import { createExpressServer, useContainer } from 'routing-controllers';
import { AirQualityController } from '../../components/air-quality/controller';
import { AirQualityService } from '../../components/air-quality/service';
import { Container } from 'typedi'; // Add typedi for DI

// Mock the AirQualityService
jest.mock('../../components/air-quality/service');

describe('AirQualityController Integration Tests', () => {
    let app: any;
    let airQualityServiceMock: jest.Mocked<AirQualityService>;

    beforeAll(() => {
        // Mock service instance
        airQualityServiceMock = new AirQualityService() as jest.Mocked<AirQualityService>;

        // Inject the mock into the typedi container
        Container.set(AirQualityService, airQualityServiceMock);

        // Set the typedi container to be used by routing-controllers
        useContainer(Container);

        // Create an Express server with the controller
        app = createExpressServer({
            controllers: [AirQualityController],
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Reset mock calls between tests
    });

    it('GET /quality should return air quality data', async () => {
        // Mock the air quality service response
        const mockAirQualityData = {
            "ts": "2024-09-12T15:00:00.000Z",
            "aqius": 55,
            "mainus": "p2",
            "aqicn": 16,
            "maincn": "p2"
        };
        airQualityServiceMock.getAirQuality.mockResolvedValueOnce(mockAirQualityData);

        // Perform the request and assert the result
        const response = await request(app).get('/quality?lat=90&lon=50');
        console.log("Response: ", response.body);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            Result: {
                Pollution: mockAirQualityData,
            },
        });
        expect(airQualityServiceMock.getAirQuality).toHaveBeenCalledWith({ lat: 90, lon: 50 });
    });
});
