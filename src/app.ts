import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import express from 'express'
import { HealthController } from './components/health/health.controller'
import { AirQualityController } from './components/air-quality/controller'


export default class RequestPayoffApp {

  public initApp() {
    const expressApp = express()
    expressApp.use(express.urlencoded({ extended: false }))
    useExpressServer(expressApp, {
      routePrefix: '/air',
      defaultErrorHandler: false,
      controllers: [HealthController, AirQualityController],
      validation: true,
    })
    return expressApp
  }
}
