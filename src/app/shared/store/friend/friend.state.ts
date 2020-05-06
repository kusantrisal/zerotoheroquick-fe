import { State, Action, StateContext } from "@ngxs/store";
import { Friend } from './friend.model';
import { PatchFriend } from './friend.actions';

@State<Friend[]>({
    name: 'friends',
    defaults: [{
        firstName: 'Hello',
        lastname: 'Friend'
    }]
})

export class FriendState {
    @Action(PatchFriend)
    patchFriends({ setState, getState }: StateContext<Friend[]>, { payload }: PatchFriend) {
        const currentFriends = getState();
        currentFriends.push(payload)
        setState(currentFriends);
    }
}
