import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { VendorService } from '../../../modules/user/services/vendor.service';
import { ImageService } from '../../../modules/image/services/image.service';
import type { CreateVendorProps } from '../../../interfaces/vendor.request';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import {
  VENDOR_BACKGROUND_FOLDER,
  VENDOR_IMAGE_FOLDER,
} from '../../../constants/folder';
import type {
  CreateVendorInput,
  DescInput,
} from '../../../modules/user/interfaces/vendor.interface';
import type { FileInput } from '../../../interfaces/request';

@Injectable()
export class VendorResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    protected readonly vendorService: VendorService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        findMyVendorAccount: async (
          _: never,
          args: {},
          { access_token }: GlobalContext,
        ) => await this.vendorService.me(access_token),
      },
      Mutation: {
        createVendor: async (
          _: never,
          {
            args: { name, description = '', image = null, background = null },
          }: { args: CreateVendorProps },
          { access_token }: GlobalContext,
        ) => {
          try {
            let imageResp = !!image
              ? this.imageService.uploadImg(
                  {
                    filename: image.filename,
                    content: image.base64,
                    folder: VENDOR_IMAGE_FOLDER,
                  },
                  access_token,
                )
              : null;

            let backgroundResp = !!background
              ? this.imageService.uploadImg(
                  {
                    filename: background.filename,
                    content: background.base64,
                    folder: VENDOR_BACKGROUND_FOLDER,
                  },
                  access_token,
                )
              : null;

            let payload: CreateVendorInput = { name, description };

            if (imageResp !== null) {
              const { url, file_id } = await imageResp;
              payload['image'] = {
                url,
                fileId: file_id,
              };
            }

            if (backgroundResp !== null) {
              const { url, file_id } = await backgroundResp;
              payload['background'] = {
                url,
                fileId: file_id,
              };
            }

            return await this.vendorService.createVendorAccount(
              payload,
              access_token,
            );
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        updateVendorImg: async (
          _: never,
          { args }: { args: FileInput },
          { access_token }: GlobalContext,
        ) => {
          let fileId: string | null = null;
          try {
            const vendor = await this.vendorService.me(access_token);
            fileId = vendor.imageId;

            const image = await this.imageService.uploadImg(
              {
                filename: args.filename,
                content: args.base64,
                folder: VENDOR_IMAGE_FOLDER,
              },
              access_token,
            );

            return await this.vendorService.updateVendorImg(
              { url: image.url, fileId: image.file_id },
              access_token,
            );
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          } finally {
            if (!!fileId)
              this.imageService.deleteFile({ file_id: fileId }, access_token);
          }
        },
        updateVendorBg: async (
          _: never,
          { args }: { args: FileInput },
          { access_token }: GlobalContext,
        ) => {
          let fileId: string | null = null;
          try {
            const vendor = await this.vendorService.me(access_token);
            fileId = vendor.backgroundImageId;

            const image = await this.imageService.uploadImg(
              {
                filename: args.filename,
                content: args.base64,
                folder: VENDOR_BACKGROUND_FOLDER,
              },
              access_token,
            );

            return await this.vendorService.updateVendorBg(
              { url: image.url, fileId: image.file_id },
              access_token,
            );
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          } finally {
            if (!!fileId)
              this.imageService.deleteFile({ file_id: fileId }, access_token);
          }
        },
        updateVendorDesc: async (
          _: never,
          { desc }: DescInput,
          { access_token }: GlobalContext,
        ) => await this.vendorService.updateDescription({ desc }, access_token),
      },
    };
  }
}
