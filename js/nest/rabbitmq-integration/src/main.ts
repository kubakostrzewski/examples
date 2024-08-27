import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  const app = await NestFactory.create(AppModule);

  await rmqApp.listen();
  await app.listen(8080);
}
bootstrap();
