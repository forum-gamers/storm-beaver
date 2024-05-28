import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  CreateChatInput,
  DeleteChatInput,
  IChatService,
  SetReadInput,
  UpdateChatMsgInput,
} from '../interfaces/chat.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type { Chat, Message } from '../interfaces/global.interface';

@Injectable()
export class ChatService extends GRPCBASE implements OnModuleInit {
  private chatService: IChatService;
  public onModuleInit() {
    this.loadChatDefinition();
  }

  private loadChatDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/chat.proto'),
      'chat',
      'ChatService',
    );

    this.chatService = new Service(
      process.env.GRPC_CHAT_SERVICE ?? 'localhost:50055',
      credentials.createInsecure(),
    ) as IChatService;
  }

  public async createChat(args: CreateChatInput, access_token: string) {
    return new Promise<Chat>((resolve, reject) => {
      this.chatService.CreateChat(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async setRead(args: SetReadInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.chatService.SetRead(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async editMsg(args: UpdateChatMsgInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.chatService.EditMsg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteMsg(args: DeleteChatInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.chatService.DeleteMsg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
