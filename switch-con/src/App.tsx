import ExchangeHome from '@pages/exchange/ExchangeHome';
import ExchangePostCreate from '@pages/exchange/ExchangePostCreate';
import ExchangePostDetail from '@pages/exchange/ExchangePostDetail';
import ExchangeRequest from '@pages/exchange/ExchangeRequest';
import Home from '@pages/mainPage/Home';
import Landing from '@pages/mainPage/Landing';
import MyExchange from '@pages/myExchange/MyExchange';
import { Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			{/*랜딩페이지*/}
			<Route path='/home' element={<Home />} />
			{/*홈- 내가 등록한 기프티콘 보는 곳 */}
			<Route path='/exchange-home' element={<ExchangeHome />} />
			{/*교환 홈 */}
			<Route path='/exchange/:id' element={<ExchangePostDetail />} />
			{/*교환상세페이지 */}
			<Route path='/exchange-request/:id' element={<ExchangeRequest />} />
			{/*교환 요청페이지. 기프티콘 상세에서 교환신청 버튼으로 이동. id값: 기프티콘 게시글 id */}
			<Route path='/exchange-post' element={<ExchangePostCreate />} /> {/*교환 게시글 작성 */}
			<Route path='/my-con' element={<MyExchange />} />
		</Routes>
	);
};

export default App;
