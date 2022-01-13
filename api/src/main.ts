import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
console.log('starting', process.env)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set up prisma service shutdown
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  // const whitelist = ['http://encounter-app.loca.lt'];

  // const corsOptionsDelegate = function (req, callback) {
  //   let corsOptions;
  //   console.log(req.header('Origin'))
  //   if (whitelist.indexOf(req.header('Origin')) !== -1) {
  //     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  //   } else {
  //     corsOptions = { origin: false }; // disable CORS for this request
  //   }
  //   callback(null, corsOptions); // callback expects two parameters: error and options
  // };

  // app.use(cors({ origin: '*', credentials: true }))

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
