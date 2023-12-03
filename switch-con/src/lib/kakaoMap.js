import { useEffect } from 'react';

const NearbyStoreMap = () => {
	useEffect(() => {
		// 사용자 좌표 얻어오기 & Map생성
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;

					console.log('users position', lat, lng);
					const container = document.getElementById('map');

					const options = {
						center: new kakao.maps.LatLng(lat, lng),
						level: 3, // 확대수준
					};
					const map = new kakao.maps.Map(container, options);
					const circle = new kakao.maps.Circle({
						center: new kakao.maps.LatLng(lat, lng),
						radius: 20, //미터 단위의 원의 반지름
						strokeWeight: 4, //선의 두께
						strokeColor: '#75b8fa',
						strokeOpacity: 0.8, //선의 불투명도 1에서 0사이, 0에 가까울수록 투명
						fillColor: '#CFE7FF', //채우기 색
						fillOpacity: 0.6,
					});
					circle.setMap(map);
				},
				(error) => {
					console.error('사용자 위치정보 가져오는데 실패했습니다', error);
				},
			);
		} else {
			console.error('브라우저에서 geolocation 지원하지 않습니다.');
		}
	}, []);

	return (
		<div
			id='map'
			style={{
				width: '100%',
				height: '400px',
			}}
		></div>
	);
};

export default NearbyStoreMap;
