// AuthService.js

// 사용자 로그인 정보를 저장
// export const setAuthToken = (token) => {
// 	localStorage.setItem(TOKEN_KEY, token);
// };

// 사용자 로그인 정보를 가져옴
export const getAuthToken = () => {
	return localStorage.getItem('access');
};

// 사용자 로그인 정보를 삭제
export const removeAuthToken = () => {
	localStorage.removeItem('access');
};

// 현재 사용자가 로그인되어 있는지 확인
export const isUserLoggedIn = () => {
	return !!getAuthToken();
};
