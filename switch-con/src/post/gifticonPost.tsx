import axios from 'axios';

export const gifticonPost = async (
	gifticonImg: string,
	category: string,
	store: string,
	product: string,
	barcodeNum: string,
	orderNum: string,
	expireDate: string,
	price: number,
	used: boolean,
) => {
	try {
		const result = await axios
			.post(
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
						Authorization: `Bearer ${localStorage.getItem('access')}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((result) => {
				console.log('요청성공');
				console.log(result);
				return result.data;
			})
			.catch((error) => {
				console.log('요청실패');
				console.log(error);
			});

		return result.data;
	} catch (error) {
		console.error('Error during POST request:', error);
		throw error;
	}
};
