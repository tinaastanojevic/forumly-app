import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Dozvoli frontend sa ovog URL-a
    methods: 'GET, POST, PUT, DELETE, PATCH',  // Dozvoljava ove HTTP metode
    allowedHeaders: 'Content-Type, Authorization', 
  
  });

  // app.enableCors({
  //   origin: '*',  // Dozvoljava sve domena (za testiranje)
  //   methods: 'GET, POST, PUT, DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  // });

  await app.listen(process.env.PORT ?? 3000);
 

  
  
}


bootstrap();
