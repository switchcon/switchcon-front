import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getNewRefreshToken = async () => {
	const accessToken = localStorage.getItem('access');
	const refreshToken = localStorage.getItem('refresh');
	const result = await axios.post(
		`${BASE_URL}/login`,
		{
			refreshToken,
		},
		{
			headers: {
				Authorization: accessToken,
			},
		},
	);
	return result.data;
};

export const getAuthAxios = (token) => {
	const authAxios = axios.create({
		baseURL: `${BASE_URL}/login`,
		headers: {
			Authorization: token,
		},
	});
	// 만료된 경우
	authAxios.interceptors.response.use(
		(res) => res,
		async (error) => {
			if (error.response.status == 401) {
				const { accessToken, refreshToken } = await getNewRefreshToken();
				error.config.headers.Authorization = accessToken;
				localStorage.setItem('access', accessToken);
				localStorage.setItem('refresh', refreshToken);
				return (await axios.get(error.config.url, error.config)).data;
			}
		},
	);
	return authAxios;
};

export const loginApi = async (accountId: string, password: string) => {
	const result = await axios.post(`${BASE_URL}/login`, { accountId, password });

	localStorage.setItem('access', result.data.data);
	localStorage.setItem('refresh', result.data.data);

	return result.data.data;
};

export const signUp = async (accountId: string, password: string, checkPassword: string, nickname: string) => {
	const result = await axios.post(`${BASE_URL}/join`, {
		accountId,
		password,
		checkPassword,
		nickname,
	});

	return result.data;
};
