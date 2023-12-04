import { Button } from '@components/ui/button';
import axios from 'axios';
// import { userInfo } from '../../get/userInfo';
// import { gifticonExDetail } from '../../get/gifticonExDetail';
// import { ExPost } from '../../get/ExPost';
// import { ExReq } from '../../get/ExReq';
// import { gifticonAll } from '../../get/gifticonAll';
// import { gifticonExReqPost } from '../../post/gifticonExReqPost';
// import { gifticonExPost } from '../../post/gifticonExPost';
// import { gifticonExAll } from '../../get/gifticonExAll';
// import { gifticonDetail } from '../../get/gifticonDetail';
// import { gifticonExSuccessPost } from '../../post/gifticonExSuccessPost';
// import { gifticonPost } from '../../post/gifticonPost';
// import { ocrPost } from '../../post/ocrPost';
// import { gifticonDelete } from '../../delete/gifticonDelete';
// import { gifticonExDelete } from '../../delete/gifticonExDelete';
// import { gifticonExReqDelete } from '../../delete/gifticonExReqDelete';

axios.defaults.withCredentials = true;

/* eslint-disable */ //warning 무시
const Landing = () => {
	return (
		<div>
			<Button>로딩중</Button>
		</div>

		/* <div>
get
<Button onClick={ExPost}>ExPost get test</Button>
<Button onClick={ExReq}>ExReq get test</Button>
<Button onClick={() => gifticonAll('expiringSoon')}>gifticonAll get test</Button>
<Button onClick={() => gifticonDetail(29)}>gifiticonDetail get test</Button>
<Button onClick={() => gifticonExAll('expiringSoon')}>gifiticonExALL get test</Button>
<Button onClick={() => gifticonExDetail(9)}>gifiticonExDetail get test</Button>
<Button onClick={userInfo}>userInfo get test</Button>
post
<Button onClick={() => gifticonExPost(40, '치킨')}>gifticonExPost post test</Button>
<Button onClick={() => gifticonExReqPost(39, 9)}>gifticonExReqPost post test</Button>
<Button onClick={() => gifticonExSuccessPost(7, 5)}>gifticonExSuccessPost post test</Button>
<Button
	onClick={() => gifticonPost('/images/image_url_2.jpg', '1', '1', '1', '1', '1', '2024-11-29', 10000, true)}
>
	gifticonPost post test
</Button>
<Button onClick={() => ocrPost('/images/image_url_2.jpg')}>ocr post test</Button>
delete
<Button onClick={() => gifticonDelete(30)}>gifticonDelete delete test</Button>
<Button onClick={() => gifticonExDelete(7)}>gifticonExDelete delete test</Button>
<Button onClick={() => gifticonExReqDelete(6, 6)}>gifticonExReqDelete delete test</Button>
</div> */
	);
};

export default Landing;
