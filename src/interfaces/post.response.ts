import type { IUser } from '../modules/user/user.interfaces';
import type { PostResponse } from '../modules/post/post.interfaces';

export type PostResolverResp = PostResponse & { user: IUser };
