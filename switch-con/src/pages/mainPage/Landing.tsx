import { Button } from '@components/ui/button';
import axios from 'axios';
axios.defaults.withCredentials = true;

/* eslint-disable */ //warning 무시
const Landing = () => {
	return (
		<div>
			로딩중
			<Button>giftcon post </Button>
		</div>
	);
};

export default Landing;
