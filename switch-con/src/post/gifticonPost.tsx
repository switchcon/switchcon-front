import axios from 'axios';

// 이미지 URL을 Base64로 인코딩하는 함수
const encodeImageToBase64 = async (imageUrl) => {
	try {
		const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
		const base64Image = btoa(
			new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
		);
		return base64Image;
	} catch (error) {
		console.error('이미지 가져오기 또는 인코딩 중 오류 발생:', error);
		throw error;
	}
};

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
		// 이미지 URL을 Base64로 인코딩
		const base64Image = await encodeImageToBase64(gifticonImg);

		const result = await axios.post(
			'http://3.36.253.248:8080/gifticon',
			{
				gifticonImg: base64Image,
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
		);

		console.log('요청 성공');
		console.log(result);

		return result.data;
	} catch (error) {
		console.error('POST 요청 중 오류 발생:', error);
		throw error;
	}
};
