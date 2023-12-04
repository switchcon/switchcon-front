import { getAuthAxios } from './authAxios';

export const getHome = async () => {
	const access = localStorage.getItem('access');
	// const authAxios = getAuthAxios(access);
	// const result = await authAxios.get('/login');
	// return result.data;
	return access;
};
