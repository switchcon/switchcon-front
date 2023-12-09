import ExchangeHome from '@pages/exchange/ExchangeHome';
import ExchangePostCreate from '@pages/exchange/ExchangePostCreate';
import ExchangePostDetail from '@pages/exchange/ExchangePostDetail';
import ExchangeRequest from '@pages/exchange/ExchangeRequest';
import GiftconPostDetail from '@pages/giftCon/GiftconPostDetail';

import GiftconRegisterPage from '@pages/giftCon/GiftConRegister';
import Login from '@pages/login/Login';
import Signup from '@pages/login/Signup';

import Home from '@pages/mainPage/Home';
import MyExchange from '@pages/myExchange/MyExchange';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const App = () => {
	return (
		<RecoilRoot>
			<Router basename={process.env.PUBLIC_URL}>
				{/*랜딩페이지*/}
				<Route path='/' element={<Login />} />
				{/*홈- 내가 등록한 기프티콘 보는 곳 */}
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/home' element={<Home />} />
				<Route path='/home/giftcon-regi' element={<GiftconRegisterPage />} /> {/* 기프티콘 등록페이지 */}
				<Route path='/home/giftcon/:id' element={<GiftconPostDetail />} /> 기프티콘 상세페이지
				<Route path='/exchange-home' element={<ExchangeHome />} />
				{/*교환 홈 */}
				<Route path='/exchange/:id' element={<ExchangePostDetail />} />
				{/*교환상세페이지 */}
				<Route path='/exchange-request/:id' element={<ExchangeRequest />} />
				{/*교환 요청페이지. 기프티콘 상세에서 교환신청 버튼으로 이동. id값: 기프티콘 게시글 id */}
				<Route path='/exchange-post' element={<ExchangePostCreate />} /> {/*교환 게시글 작성 */}
				<Route path='/my-con' element={<MyExchange />} /> {/*내콘 화면 */}
			</Router>
		</RecoilRoot>
	);
};

export default App;
