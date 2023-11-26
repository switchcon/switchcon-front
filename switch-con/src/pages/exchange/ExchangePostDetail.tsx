import Header from '@components/ui/Header';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useParams } from 'react-router-dom';

const giftcons = {
	exchangePost_id: 1,
	gifticon_img: '/images/image_url_1.jpg',
	category: '음료',
	store: '스타벅스',
	product: '아메리카노',
	expiration_date: '2024-01-01',
	barcode_num: '1234567890',
	price: 5000,
	is_used: false,
	is_active: true,
	created_at: '2023-11-22',
	modfied_at: '2023-11-22',
	exchangeReq_count: 3,
};

const ExchangePostDetail = () => {
	const { id } = useParams();
	console.log('post ID', id);
	//id값으로 교환상세페이지 데이터 호출
	return (
		<>
			<Header headline={'교환 기프티콘 상세'} />
			<main className='px-6 pt-16'>
				<div className='font-semibold'> {giftcons.product}</div>
				<div className='w-2/5 mr-2 overflow-hidden rounded-md'>
					<AspectRatio.Root ratio={16 / 9}>
						<img src={giftcons.gifticon_img} className='object-cover w-full h-full' />
					</AspectRatio.Root>
				</div>
			</main>
		</>
	);
};

export default ExchangePostDetail;
