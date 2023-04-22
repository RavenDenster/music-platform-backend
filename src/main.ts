import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import cookieParser from 'cookie-parser';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

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
        app.use(allowCors(handler))
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