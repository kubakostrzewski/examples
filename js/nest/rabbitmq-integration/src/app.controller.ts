import { Body, Controller, Post } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq/rabbitmq.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly rabbitMQService: RabbitMqService) {}

  @Post('send-event')
  async sendEvent(@Body() data: unknown) {
    await this.rabbitMQService.sendEvent(data);
    return 'Event sent to RabbitMQ';
  }

  @Post('send-message')
  async sendMessage(@Body() data: unknown) {
    return await this.rabbitMQService.sendMessage(data);
  }

  @EventPattern('event_name')
  public handleEvent(@Payload() data: unknown): void {
    console.log('event', { data });
  }

  @MessagePattern({ cmd: 'message_name' })
  handleMessage(data: unknown): unknown {
    const message = `message: ${JSON.stringify(data)}`;
    console.log(message);
    return message;
  }

  @MessagePattern('message_with_ack')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(originalMsg['content'].toString());

    channel.ack(originalMsg);
  }
}
