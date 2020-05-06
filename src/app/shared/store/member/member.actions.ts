import { Member } from './member.model';

export class SetMember {
    // which method to invoke in the state is the type
    static readonly type = '[Member] setMember';
    constructor(public payload: Member) { }
}

export class PatchMember {
    // which method to invoke in the state is the type
    static readonly type = '[Member] patchMember';
    constructor(public payload: Member) { }
}