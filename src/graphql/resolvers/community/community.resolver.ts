import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { CommunityService } from '../../../modules/community/services/community.service';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import type { CreateCommunityProps } from '../../../interfaces/community.request';
import { ImageService } from '../../../modules/image/services/image.service';
import type {
  ChangeOwnershipInput,
  CommunityIdInput,
  CreateCommunityInput,
  TextInput,
} from '../../../modules/community/interfaces/community.interface';
import type { FileInput } from '../../../interfaces/request';
import {
  COMMUNITY_BACKGROUND_FOLDER,
  COMMUNITY_IMAGE_FOLDER,
} from '../../../constants/folder';

@Injectable()
export class CommunityResolver
  extends ResolverHelper
  implements ResolverInitiate
{
  constructor(
    private readonly communityService: CommunityService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        findById: async (
          _: never,
          { communityId }: CommunityIdInput,
          { access_token }: GlobalContext,
        ) =>
          await this.communityService.findById({ communityId }, access_token),
      },
      Mutation: {
        createCommunity: async (
          _: never,
          {
            args: { name, image = null, desc = '', background = null },
          }: { args: CreateCommunityProps },
          { access_token }: GlobalContext,
        ) => {
          try {
            let imageResp = !!image
              ? this.imageService.uploadImg(
                  {
                    filename: image.filename,
                    content: image.base64,
                    folder: COMMUNITY_IMAGE_FOLDER,
                  },
                  access_token,
                )
              : null;
            let backgroundResp = !!background
              ? this.imageService.uploadImg(
                  {
                    filename: background.filename,
                    content: background.base64,
                    folder: COMMUNITY_BACKGROUND_FOLDER,
                  },
                  access_token,
                )
              : null;

            let payload: CreateCommunityInput = {
              name,
              desc,
            };

            if (imageResp !== null) {
              const { url, file_id } = await imageResp;
              payload['imageUrl'] = url;
              payload['imageId'] = file_id;
            }

            if (backgroundResp !== null) {
              const { url, file_id } = await backgroundResp;
              payload['backgroundUrl'] = url;
              payload['backgroundId'] = file_id;
            }

            return await this.communityService.createCommunity(
              payload,
              access_token,
            );
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        deleteCommunity: async (
          _: never,
          { communityId }: CommunityIdInput,
          { access_token }: GlobalContext,
        ) => {
          try {
            const result = await this.communityService.deleteCommunity(
              { communityId },
              access_token,
            );

            const file_ids: string[] = [];
            if (result.imageId) file_ids.push(result.imageId);
            if (result.backgroundId) file_ids.push(result.backgroundId);

            if (file_ids.length)
              this.imageService.bulkDelete({ file_ids }, access_token);

            return 'success';
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        updateImg: async (
          _: never,
          { file, communityId }: CommunityIdInput & { file: FileInput },
          { access_token }: GlobalContext,
        ) => {
          let fileId: string | null = null;
          try {
            const community = await this.communityService.findById(
              { communityId },
              access_token,
            );
            fileId = community.imageId;

            const image = await this.imageService.uploadImg(
              {
                filename: file.filename,
                content: file.base64,
                folder: COMMUNITY_IMAGE_FOLDER,
              },
              access_token,
            );

            return await this.communityService.updateImg(
              { communityId, url: image.url, id: image.file_id },
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
        updateBackground: async (
          _: never,
          { file, communityId }: CommunityIdInput & { file: FileInput },
          { access_token }: GlobalContext,
        ) => {
          let fileId: string | null = null;
          try {
            const community = await this.communityService.findById(
              { communityId },
              access_token,
            );
            fileId = community.backgroundId;

            const image = await this.imageService.uploadImg(
              {
                filename: file.filename,
                content: file.base64,
                folder: COMMUNITY_BACKGROUND_FOLDER,
              },
              access_token,
            );

            return await this.communityService.updateBg(
              { communityId, url: image.url, id: image.file_id },
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
        updateDesc: async (
          _: never,
          { text, communityId }: TextInput,
          { access_token }: GlobalContext,
        ) =>
          await this.communityService.updateDesc(
            { text, communityId },
            access_token,
          ),
        changeOwnership: async (
          _: never,
          { communityId, targetId }: ChangeOwnershipInput,
          { access_token }: GlobalContext,
        ) =>
          await this.communityService.changeOwnership(
            { communityId, targetId },
            access_token,
          ),
      },
    };
  }
}
