import { getHome } from '@apis/getHome';
import axios from 'axios';

export const gifticonPost = async (
	gifticonImg: string,
	category: string,
	store: string,
	product: string,
	barcodeNum: string,
	orderNum: string,
	expireDate: string,
	price: string,
	used: string,
) => {
	const authToken = getHome();

	try {
		const result = await axios.post(
			'http://3.36.253.248:8080/gifticon',
			{
				gifticonImg,
				category,
				store,
				product,
				barcodeNum,
				orderNum,
				expireDate,
				price,
				used,
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
