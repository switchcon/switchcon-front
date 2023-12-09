import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('access')}`,
		'Content-Type': 'application/json',
	},
});
// 교환게시물 전체 조회
export const getAllExchangePost = async (sortType) => {
	//sortType: latest (최신등록순), expiringSoon(유효기간임박순), highPrice(높은 가격순), lowPrice(낮은가격순)
	try {
		const response = await api.get(`/exchange/all/${sortType}`);
		return response.data.data;
	} catch (error) {
		console.error('Error during giftconAll', error);
		throw error;
	}
};

//교환 게시물 상세조회
export const getGifticonDetailPost = async (exchangePostId: number) => {
	try {
		const response = await api.get(`/exchange/${exchangePostId}`);
		return response.data.data;
	} catch (error) {
		console.error('Error during DELETE request:', error);
		throw error;
	}
};

//교환게시물삭제
export const gifticonExchangeDelete = async (exchangePostId: number) => {
	try {
		const response = await api.delete(`/exchange/${exchangePostId}`);
		return response.data.status;
	} catch (error) {
		console.error('Error during DELETE request:', error);
		throw error;
	}
};

//교환 게시물 등록
export const gifticonExchangePost = async (gifticonId: number, preference: string) => {
	try {
		console.log('gifticonId', gifticonId, preference);
		const response = await api.post(`/exchange`, { gifticonId, preference });
		return response.data.status;
	} catch (error) {
		console.error('Error during DELETE request:', error);
		throw error;
	}
};

//교환수락
//교환 요청
export const gifticonExchangeRequestPost = async (exchangePostId: number, gifticonId: number) => {
	try {
		const response = await api.post(`/exchange/${exchangePostId}/request`, { gifticonId });
		return response.data.status;
	} catch (error) {
		console.error('Error during gifticonExchangeRequestPost', error);
		throw error;
	}
};

//교환수락
export const gifticonExchangeSuccessPost = async (exchangePostId: number, exchangeRequestId: number) => {
	try {
		const response = await api.post(`/exchange/${exchangePostId}/request/${exchangeRequestId}/success`, {
			exchangePostId,
			exchangeRequestId,
		});
		return response.data.status;
	} catch (error) {
		console.error('Error during DELETE request:', error);
		throw error;
	}
};
