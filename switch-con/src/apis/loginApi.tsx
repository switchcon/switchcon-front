import axios from 'axios';

export const loginApi = async (accountId: string, password: string) => {
	const result = await axios.post('http://3.36.253.248:8080/login', { accountId, password });

	return result.data.data;
};
