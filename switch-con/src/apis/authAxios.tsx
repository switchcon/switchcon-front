import axios from 'axios';
import { getNewRefreshToken } from './refresh';

export const getAuthAxios = (token) => {
	const authAxios = axios.create({
		baseURL: `${process.env.REACT_APP_BASE_URL}/login`,
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
