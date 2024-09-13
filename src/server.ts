import * as http from 'http'
import Config from 'config'
import connectDb from "./common/connection"
import {AirQualityJob} from'./components/air-quality/job'
import RequestPayoffApp from './app';

class RequestPayoffServer {
  server: any
  readonly host: string
  readonly port: number

  private onListening(): void {
    const addr: any = this.server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + addr.address + ' -- ' + bind)
  }

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  constructor() {
    this.host = Config.get('host')
    this.port = Config.get('port')
    console.log(this.host)

    const app = new RequestPayoffApp()
    this.server = http.createServer(app.initApp())
    this.server.listen(this.port, this.host)
    this.server.on('error', (e: any) => {
      console.log('Error', e)
    })
    this.server.on('listening', async () => {
      await connectDb()
      await new AirQualityJob().scheduleAirQualityJob()
      console.log(`server is working on ${this.host} -- ${this.port}`)
    })
  }
}

const requestPayoffServer = new RequestPayoffServer()
