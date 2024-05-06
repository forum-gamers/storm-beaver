import { Injectable, type OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  Metadata,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import type {
  IUser,
  IUserService,
  LoginInput,
  MultipleUserParams,
  RegisterInput,
  UserParams,
} from './interfaces';
import { config } from 'dotenv';

config();

@Injectable()
export class UserService implements OnModuleInit {
  private userService: IUserService;

  public onModuleInit() {
    this.loadUserDefinition();
  }

  private loadUserDefinition() {
    const Service = (
      loadPackageDefinition(
        loadSync(join(__dirname, './proto/user.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).user as GrpcObject
    ).UserService as ServiceClientConstructor;

    this.userService = new Service(
      process.env.GRPC_USER_SERVICE ?? 'localhost:50050',
      credentials.createInsecure(),
    ) as IUserService;
  }

  public async getMultipleUsers(params: MultipleUserParams, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<IUser[]>((resolve) => {
      this.userService.GetMultipleUser(params, metadata, (err, response) => {
        resolve(err ? [] : response.data);
      });
    });
  }

  public async me(token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<IUser>((resolve) => {
      this.userService.Me({}, metadata, (err, response) => {
        resolve(err ? null : response.data);
      });
    });
  }

  public async getById(params: UserParams, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<IUser>((resolve) => {
      this.userService.GetUserById(params, metadata, (err, response) => {
        resolve(err ? null : response.data);
      });
    });
  }

  public async register(args: RegisterInput) {
    return new Promise<IUser>((resolve, reject) => {
      this.userService.Register(args, new Metadata(), (err, resp) => {
        if (err) reject(err);

        resolve(resp?.data);
      });
    });
  }

  public async login(args: LoginInput) {
    return new Promise<string>((resolve, reject) => {
      this.userService.Login(args, new Metadata(), (err, resp) => {
        if (err) reject(err);

        resolve(resp?.token);
      });
    });
  }
}
