export const decodingBase64 = (base64String) => {
	if (base64String) {
		console.log('decoding...');
		const decodedData = atob(base64String);

		return decodedData;
	}
	return null;
};
