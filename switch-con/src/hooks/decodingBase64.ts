import { useState, useEffect } from 'react';

// base64디코딩함수
const useDecodingBase64 = (base64String) => {
	const [decodedImage, setDecodedImage] = useState(null);

	useEffect(() => {
		if (base64String) {
			const decodedData = atob(base64String.split(',')[1]);
			setDecodedImage(decodedData);
		}
	}, [base64String]);

	return decodedImage;
};
