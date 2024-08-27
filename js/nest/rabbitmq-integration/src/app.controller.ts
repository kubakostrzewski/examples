import { Body, Controller, Post } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq/rabbitmq.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly rabbitMQService: RabbitMqService) {}

  @Post('send-notification')
  async sendNotification(@Body() notification: unknown) {
    await this.rabbitMQService.sendNotification(notification);
    return 'Notification sent to RabbitMQ';
  }

  @EventPattern('event_name')
  public sendEmailPattern(@Payload() data): void {
    console.log('email sent!', { data });
  }
}
