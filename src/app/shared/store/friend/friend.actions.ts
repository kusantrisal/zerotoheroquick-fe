import { Friend } from './friend.model';

export class PatchFriend {
    // which method to invoke in the state is the type
    static readonly type = '[FRIEND] patchFriend';
    constructor(public payload: Friend) { }
}