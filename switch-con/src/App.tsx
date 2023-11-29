/* eslint-disable */ //warning 무시
import ExchangeHome from '@pages/exchange/ExchangeHome';
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
		</Routes>
	);
};

export default App;
