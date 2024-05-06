import { Injectable, type OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
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
} from './user.interfaces';
import { config } from 'dotenv';
import { GRPCBASE } from '../../base/grpc.base.service';

config();

@Injectable()
export class UserService extends GRPCBASE implements OnModuleInit {
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
    return new Promise<IUser[]>((resolve) => {
      this.userService.GetMultipleUser(
        params,
        this.generateMetadata({ access_token: token }),
        (err, response) => {
          resolve(err ? [] : response.data);
        },
      );
    });
  }

  public async me(token: string) {
    return new Promise<IUser>((resolve, reject) => {
      this.userService.Me(
        {},
        this.generateMetadata({ access_token: token }),
        (err, response) => {
          if (err) reject(err);

          resolve(response?.data);
        },
      );
    });
  }

  public async getById(params: UserParams, token: string) {
    return new Promise<IUser>((resolve, reject) => {
      this.userService.GetUserById(
        params,
        this.generateMetadata({ access_token: token }),
        (err, response) => {
          if (err) reject(err);

          resolve(response?.data);
        },
      );
    });
  }

  public async register(args: RegisterInput) {
    return new Promise<IUser>((resolve, reject) => {
      this.userService.Register(args, this.generateMetadata(), (err, resp) => {
        if (err) reject(err);

        resolve(resp?.data);
      });
    });
  }

  public async login(args: LoginInput) {
    return new Promise<string>((resolve, reject) => {
      this.userService.Login(args, this.generateMetadata(), (err, resp) => {
        if (err) reject(err);

        resolve(resp?.token);
      });
    });
  }
}
