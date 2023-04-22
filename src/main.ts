import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import cookieParser from 'cookie-parser';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors({
            origin: [
              'https://music-platform-frontend-zeta.vercel.app',
              'http://localhost:3000/',
            ],
            methods: ["GET", "POST", "PUT", "DELETE"],
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