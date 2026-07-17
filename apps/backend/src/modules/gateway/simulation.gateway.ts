import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SimulationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    client.emit('player:message', { type: 'system', text: 'Connected to AI Kingdoms realtime server.' });
  }

  handleDisconnect() {
    return true;
  }

  broadcastTick(tick: number) {
    this.server.emit('world:tick', { tick, timestamp: Date.now() });
  }

  @SubscribeMessage('chat:send')
  handleChat(@ConnectedSocket() client: Socket, @MessageBody() body: { message: string; channel: string }) {
    this.server.emit('chat:message', {
      senderId: client.id,
      senderName: 'Player',
      message: body.message,
      channel: body.channel,
      tick: Date.now(),
    });
  }
}
