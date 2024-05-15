import { Injectable, type OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  CreateVendorInput,
  DescInput,
  FileInput,
  IVendorService,
  Vendor,
} from '../interfaces/vendor.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';

config();

@Injectable()
export class VendorService extends GRPCBASE implements OnModuleInit {
  private vendorService: IVendorService;
  public onModuleInit() {
    this.loadVendorDefinition();
  }

  private loadVendorDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/vendor.proto'),
      'vendor',
      'VendorService',
    );

    this.vendorService = new Service(
      process.env.GRPC_USER_SERVICE ?? 'localhost:50050',
      credentials.createInsecure(),
    ) as IVendorService;
  }

  public async createVendorAccount(
    args: CreateVendorInput,
    access_token: string,
  ) {
    return new Promise<Vendor>((resolve, reject) => {
      this.vendorService.CreateVendorAccount(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateVendorImg(args: FileInput, access_token: string) {
    return new Promise<Vendor>((resolve, reject) => {
      this.vendorService.UpdateVendorImg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateVendorBg(args: FileInput, access_token: string) {
    return new Promise<Vendor>((resolve, reject) => {
      this.vendorService.UpdateVendorBg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateDescription(args: DescInput, access_token: string) {
    return new Promise<Vendor>((resolve, reject) => {
      this.vendorService.UpdateDesc(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async me(access_token: string) {
    return new Promise<Vendor>((resolve, reject) => {
      this.vendorService.Me(
        {},
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
