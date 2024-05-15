import type { IUser } from '../modules/user/interfaces/user.interfaces';
import type { PostResponse } from '../modules/post/interfaces/post.interfaces';

export type PostResolverResp = PostResponse & { user: IUser };
