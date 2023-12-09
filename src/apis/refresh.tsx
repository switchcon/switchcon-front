import axios from 'axios';

export const getNewRefreshToken = async () => {
	const accessToken = localStorage.getItem('access');
	const refreshToken = localStorage.getItem('refresh');
	const result = await axios.post(
		'http://3.36.253.248:8080/login',
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
