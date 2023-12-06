import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('access')}`,
		'Content-Type': 'application/json',
	},
});

//exchange
//교환 게시물 상세조회
//교환게시물삭제
// 교환게시물 전체 조회
//교한 요청 등록
//교환수락
//교환 요청
