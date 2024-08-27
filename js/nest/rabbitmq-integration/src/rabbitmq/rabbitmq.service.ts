import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMqService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notification_queue',
      },
    });
  }

  async sendEvent(data: unknown) {
    return await firstValueFrom(this.client.emit('event_name', data));
  }

  async sendMessage(data: unknown) {
    const pattern = { cmd: 'message_name' };
    return await firstValueFrom(this.client.emit(pattern, data));
  }
}
