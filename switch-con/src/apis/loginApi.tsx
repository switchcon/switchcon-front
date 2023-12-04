import axios from 'axios';

export const loginApi = async (accountId: string, password: string) => {
	const result = await axios.post('http://3.36.253.248:8080/login', { accountId, password });

	localStorage.setItem('access', result.data.data);
	localStorage.setItem('refresh', result.data.data);

	return result.data.data;
};
