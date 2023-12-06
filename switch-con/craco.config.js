const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@lib': path.resolve(__dirname, 'src/lib'),
			'@post': path.resolve(__dirname, 'src/post'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@get': path.resolve(__dirname, 'src/get'),
			'@delete': path.resolve(__dirname, 'src/delete'),
		},
	},
};
