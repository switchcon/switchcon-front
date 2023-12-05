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

export const postGiftcon = async (gifticon: {
	gifticonImg: string;
	category: string;
	store: string;
	product: string;
	barcodeNum: string;
	orderNum: string;
	expireDate: string;
	price: number;
	used: boolean;
}) => {
	try {
		const response = await api.post(`/gifticon`, gifticon);
		return response.data.status;
	} catch (error) {
		console.error('Error during POST giftcon', error);
		throw error;
	}
};

export const ocrPost = async (base64Image: string) => {
	try {
		const response = await api.post(`/gifticon/ocr`, {
			gifticonImg: base64Image,
		});
		console.log('ocr', response.data);
		return response.data.data;
	} catch (error) {
		console.error('ocrPost request error', error);
		throw error;
	}
};
