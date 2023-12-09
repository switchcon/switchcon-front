import { Button } from '@components/ui/button';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

/* eslint-disable */ //warning 무시
const navigate = useNavigate();
const Landing = () => {

	return navigate('/login');

};

export default Landing;
