import axios from 'axios';

const fetchImageAndEncode = async (imageUrl) => {
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

export const ocrPost = async (gifticonImg) => {
	try {
		const base64Image = await fetchImageAndEncode(gifticonImg);

		const result = await axios.post(
			'http://3.36.253.248:8080/gifticon/ocr',
			{
				gifticonImg: base64Image,
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
