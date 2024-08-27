import { Body, Controller, Get, Post } from "@nestjs/common";
import { RabbitMqService } from "./rabbitmq/rabbitmq.service";

@Controller()
export class AppController {

  constructor(private readonly rabbitMQService: RabbitMqService) {}

  @Post('send-notification')
  async sendNotification(@Body() notification: unknown) {
    await this.rabbitMQService.sendNotification(notification);
    return 'Notification sent to RabbitMQ';
  }


  @Get()
  getHello(): string {
    return 'this.appService.getHello()';
  }
}
