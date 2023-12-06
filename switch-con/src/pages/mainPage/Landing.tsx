import { Button } from '@components/ui/button';
import { ExPost } from '@get/ExPost';
import { ExReq } from '@get/ExReq';
import { gifticonAll } from '@get/gifticonAll';
import { gifticonDetail } from '@get/gifticonDetail';
import { gifticonExAll } from '@get/gifticonExAll';
import { gifticonExDetail } from '@get/gifticonExDetail';
import { userInfo } from '@get/userInfo';
import { gifticonExPost } from '@post/gifticonExPost';
import { gifticonExReqPost } from '@post/gifticonExReqPost';
import { gifticonExSuccessPost } from '@post/gifticonExSuccessPost';
import { gifticonPost } from '@post/gifticonPost';

import axios from 'axios';

import { ocrPost } from '@post/ocrPost';
// import { gifticonExReqDelete } from 'delete/gifticonExReqDelete';

axios.defaults.withCredentials = true;

const Landing = () => {
	return (
		<div>
			get
			<Button onClick={ExPost}>ExPost get test</Button>
			<Button onClick={ExReq}>ExReq get test</Button>
			<Button onClick={() => gifticonAll('expiringSoon')}>gifticonAll get test</Button>
			<Button onClick={() => gifticonDetail(40)}>gifiticonDetail get test</Button>
			<Button onClick={() => gifticonExAll('all')}>gifiticonExALL get test</Button>
			<Button onClick={() => gifticonExDetail(9)}>gifiticonExDetail get test</Button>
			<Button onClick={userInfo}>userInfo get test</Button>
			post
			<Button onClick={() => gifticonExPost(40, '치킨')}>gifticonExPost post test</Button>
			<Button onClick={() => gifticonExReqPost(39, 9)}>gifticonExReqPost post test</Button>
			<Button onClick={() => gifticonExSuccessPost(9, 7)}>gifticonExSuccessPost post test</Button>
			<Button
				onClick={() => gifticonPost('/images/image_url_2.jpg', '1', '1', '1', '1', '1', '2024-11-29', 10000, true)}
			>
				gifticonPost post test
			</Button>
			<Button onClick={() => ocrPost('/images/image_url_2.jpg')}>ocr post test</Button>
		</div>
	);
};

export default Landing;
