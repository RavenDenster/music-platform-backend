import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import cookieParser from 'cookie-parser';
import {json, urlencoded} from 'body-parser'

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.use(json({limit: '50mb'}))
        app.use(urlencoded({limit: '50mb', extended: true}))
        app.enableCors({
            origin: [
              'http://localhost:3000',
              'http://example.com',
              'http://www.example.com',
              'http://app.example.com',
              'https://example.com',
              'https://www.example.com',
              'https://app.example.com',
            ],
            methods: ["GET", "POST"],
            credentials: true,
          })
        app.use(cookieParser())
        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) { 
        console.log(e)
    }
}
// "compilerOptions": {
  //   "deleteOutDir": true
  // }
start()