import {IResponse, IResponseList} from './JSONStyle';

export enum RefreshState {
  Initial = 'initial',
  Idle = 'ide',
  UserPullToRefresh = 'userPullToRefresh',
  Refreshing = 'refreshing',
}

/**
 * Contains all actions that AdvancedList requires to interact with content,
 * includes Socket, Delete, Post, Update, Create, Search, and so on.
 * Every module we create, needs to have all implemented for best user experience
 */
export interface AdvancedListInteractionPool<T, PrimayKey = any> {
  remove: (id: string) => Promise<IResponse<{affectedRows: number}>>;
  update: (dto: T) => Promise<T>;
  query: (dto: T) => Promise<IResponseList<T>>;
  create: (dto: T) => Promise<T>;
  getOne(id: PrimayKey): Promise<IResponse<T | undefined>>;
}
