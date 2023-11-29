import { getHome } from '@apis/getHome';
import axios from 'axios';

export const gifticonDetail = async (gifticonId: number) => {
	const authToken = getHome();

	try {
		const result = await axios.get(
			`http://3.36.253.248:8080/gifticon/${gifticonId}`, // Use template literal to include gifticonId in the URL
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
		console.error('Error during DELETE request:', error);
		throw error; // Re-throw the error if needed
	}
};
