import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import cookieParser from 'cookie-parser';
const cors = require('cors')

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        // app.enableCors({
        //     origin: [
        //       'https://music-platform-frontend-zeta.vercel.app',
        //       // 'http://localhost:3000',
        //       'http://example.com',
        //       'http://www.example.com',
        //       'http://app.example.com',
        //       'https://example.com',
        //       'https://www.example.com',
        //       'https://app.example.com',
        //     ],
        //     methods: ["GET", "POST"],
        //     credentials: true,
        //   })
        app.use(cors())
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