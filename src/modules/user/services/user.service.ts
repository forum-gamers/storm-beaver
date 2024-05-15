import { Injectable, type OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type {
  ChangeProfileInput,
  EmailInput,
  IUser,
  IUserService,
  LoginInput,
  MultipleUserParams,
  RegisterInput,
  TokenInput,
  UserParams,
} from '../interfaces/user.interfaces';
import { config } from 'dotenv';
import { GRPCBASE } from '../../../base/grpc.base.service';

config();

@Injectable()
export class UserService extends GRPCBASE implements OnModuleInit {
  private userService: IUserService;

  public onModuleInit() {
    this.loadUserDefinition();
  }

  private loadUserDefinition() {
    const Service = this.loadService(
      join(__dirname, './proto/user.proto'),
      'user',
      'UserService',
    );

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
          if (err) return reject(this.convertError(err));

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
          if (err) return reject(this.convertError(err));

          resolve(response?.data);
        },
      );
    });
  }

  public async register(args: RegisterInput) {
    return new Promise<IUser>((resolve, reject) => {
      this.userService.Register(args, this.generateMetadata(), (err, resp) => {
        if (err) return reject(this.convertError(err));

        resolve(resp?.data);
      });
    });
  }

  public async login(args: LoginInput) {
    return new Promise<string>((resolve, reject) => {
      this.userService.Login(args, this.generateMetadata(), (err, resp) => {
        if (err) return reject(this.convertError(err));

        resolve(resp?.token);
      });
    });
  }

  public async changeProfile(args: ChangeProfileInput, access_token: string) {
    return new Promise<string>((resolve, reject) => {
      this.userService.ChangeProfileImg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp.message);
        },
      );
    });
  }

  public async changeBackground(
    args: ChangeProfileInput,
    access_token: string,
  ) {
    return new Promise<string>((resolve, reject) => {
      this.userService.ChangeBackgroundImg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp.message);
        },
      );
    });
  }

  public async changeVerified(args: TokenInput) {
    return new Promise<string>((resolve, reject) => {
      this.userService.ChangeVerified(
        args,
        this.generateMetadata(),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp?.message);
        },
      );
    });
  }

  public async resendEmail(args: EmailInput) {
    return new Promise<string>((resolve, reject) => {
      this.userService.ResendEmailVerification(
        args,
        this.generateMetadata(),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp?.message);
        },
      );
    });
  }
}
