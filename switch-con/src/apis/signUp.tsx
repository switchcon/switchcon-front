import axios from 'axios';

export const signUp = async (accountId: string, password: string, checkPassword: string, nickname: string) => {
	const result = await axios.post('http://3.36.253.248:8080/join', {
		accountId,
		password,
		checkPassword,
		nickname,
	});
	// module.exports = {
	// 	devServer: {
	// 		proxy: {
	// 			'^/mypage': {
	// 				target: 'http://3.36.253.248:8080',
	// 			},
	// 		},
	// 	},
	// };

	return result.data;
};
