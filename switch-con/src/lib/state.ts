import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
interface UserInfo {
	memberId: number;
	nickname: string;
	exchangeCoin: number;
	notifyOn: boolean;
}

export const userInfo = atom<UserInfo>({
	key: 'userInfo',
	default: {
		memberId: 0,
		nickname: '',
		exchangeCoin: 0,
		notifyOn: true,
	},
	effects_UNSTABLE: [persistAtom],
});

export const getUserId = selector({
	key: 'getUserId',
	get: ({ get }) => {
		const user = get(userInfo);
		return user.memberId;
	},
});
