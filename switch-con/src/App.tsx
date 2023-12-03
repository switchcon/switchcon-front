/* eslint-disable */ //warning 무시
import ExchangeHome from '@pages/exchange/ExchangeHome';
import ExchangePostCreate from '@pages/exchange/ExchangePostCreate';
import ExchangePostDetail from '@pages/exchange/ExchangePostDetail';
import ExchangeRequest from '@pages/exchange/ExchangeRequest';
import Login from '@pages/login/Login';
import Signup from '@pages/login/Signup';
import Home from '@pages/mainPage/Home';
import Landing from '@pages/mainPage/Landing';
import { Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/home' element={<Home />} />
			<Route path='/exchange-home' element={<ExchangeHome />} />
			<Route path='/exchange/:id' element={<ExchangePostDetail />} />
			{/*교환상세페이지 */}
			<Route path='/exchange-request/:id' element={<ExchangeRequest />} />
			{/*교환 요청페이지. 기프티콘 상세에서 교환신청 버튼으로 이동. id값: 기프티콘 게시글 id */}
			<Route path='/exchange-post' element={<ExchangePostCreate />} /> {/*교환 게시글 작성 */}
		</Routes>
	);
};

export default App;
