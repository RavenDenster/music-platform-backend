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
              // 'http://localhost:3000',
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
        app.use(function (req, res, next) {
          res.setHeader('Access-Control-Allow-Credentials', true)
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
          res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          )
          if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
          }
        });
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