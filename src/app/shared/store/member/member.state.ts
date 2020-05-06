import { State, Action, StateContext } from "@ngxs/store";
import { Member } from './member.model';
import { SetMember, PatchMember } from './member.actions';

//This is where all the action happens
@State<Member>({
    name: 'member',
    defaults: {
        firstName: 'Jon',
        lastname: 'Doe'
    }
})

export class MemberState {

    @Action(PatchMember)
    patchMember({ patchState, getState }: StateContext<Member>, { payload }: PatchMember) {
        const currentMember = getState();
        patchState({ firstName: payload.firstName });
    }

    @Action(SetMember)
    setMember({ setState }: StateContext<Member>, { payload }: SetMember) {
        setState(payload);
    }


}