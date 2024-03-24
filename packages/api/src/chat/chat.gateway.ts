import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  clients: { id: string; name: string; sessionId: string }[] = [];

  handleConnection(client: WebSocket, ...args: any[]) {
    this.clients.push({
      // id:client.handshake.query.id
      id: '',
      name: 'hoge',
      sessionId: client.id,
    });
    // this.clients.set(clientId, client); // クライアントをマップに追加
    console.log('New client connected:', client.id); // 新しいクライアントの情報をログに出力
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): void {
    console.log('nbiotenbiouertno');
    console.log({ data });
    this.server.emit('message', { text: data, id: 'hogehoge' }); // メッセージを全クライアントにブロードキャスト
  }
}
