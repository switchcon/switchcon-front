import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('access')}`,
		'Content-Type': 'application/json',
	},
});

export const getAllGiftcon = async (sortType) => {
	//sortType: latest (최신등록순), expiringSoon(유효기간임박순), highPrice(높은 가격순), lowPrice(낮은가격순)
	try {
		const response = await api.get(`/gifticon/all/${sortType}`);
		return response.data.data;
	} catch (error) {
		console.error('Error during giftconAll', error);
		throw error;
	}
};

export const postGiftcon = async (
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
		const response = await api.post(`/giftcon`, {
			gifticonImg,
			category,
			store,
			product,
			barcodeNum,
			orderNum,
			expireDate,
			price,
			used,
		});
		return response.data;
	} catch (error) {
		console.error('Error during POST giftcon', error);
		throw error;
	}
};

const fetchImageAndEncode = async (imageUrl) => {
	try {
		const response = await api.get(imageUrl, { responseType: 'arraybuffer' });
		const base64Image = btoa(
			new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
		);
		return base64Image;
	} catch (error) {
		console.error('이미지 가져오기 또는 인코딩 중 오류 발생:', error);
		throw error;
	}
};

export const ocrPost = async (base64Image: string) => {
	try {
		const response = await api.post(`/giftcon/ocr`, {
			gifticonImg: base64Image,
		});
		return response.data;
	} catch (error) {
		console.error('ocrPost request error', error);
		throw error;
	}
};
