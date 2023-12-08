import { atom, selector } from 'recoil';

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
});

export const getUserId = selector({
	key: 'getUserId',
	get: ({ get }) => {
		const user = get(userInfo);
		return user.memberId;
	},
});
