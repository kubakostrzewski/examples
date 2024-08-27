import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RabbitMqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RabbitMqService],
})
export class AppModule {}
