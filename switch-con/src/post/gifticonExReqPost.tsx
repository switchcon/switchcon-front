import { getHome } from '@apis/getHome';
import axios from 'axios';

export const gifticonExReqPost = async (gifticonId: number, exchangePostId: 'string') => {
	const authToken = getHome();

	try {
		const result = await axios.post(
			`http://3.36.253.248:8080/exchange/${exchangePostId}/request`,
			{
				gifticonId,
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json',
				},
			},
		);

		return result.data;
	} catch (error) {
		// Handle error
		console.error('Error during POST request:', error);
		throw error; // Re-throw the error if needed
	}
};
