import Header from '@components/ui/Header';
import NearbyStoreMap from '@lib/kakaoMap';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useParams } from 'react-router-dom';
const example_img = '/images/image_url_1.jpg';

const giftcon = {
	exchangePost_id: 1,
	gifticon_img: '/images/image_url_1.jpg',
	category: '식품/음료',
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

const GiftconPostDetail = () => {
	const { id } = useParams();
	console.log('post ID', id);
	return (
		<div>
			<Header headline={'기프티콘 조회'} />
			<main className='px-6 pt-16 pb-12'>
				<div className='mt-2 mb-2 text-lg font-semibold'>{giftcon.store + giftcon.product} </div>
				<div className='w-full px-6 py-6 overflow-hidden bg-white rounded-md'>
					<AspectRatio.Root ratio={9 / 16}>
						<img src={example_img} className='object-cover w-full h-full' />
					</AspectRatio.Root>
				</div>
				<div className='mt-2 mb-2 text-lg font-semibold'>기프티콘 정보</div>
				<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품 종류</p>
						<p className='text-sm font-medium '> {giftcon.category}</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 사용처</p>
						<p className='text-sm font-medium '> {giftcon.store}</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품명</p>
						<p className='text-sm font-medium '> {giftcon.product}</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 유효기간</p>
						<p className='text-sm font-medium '> {giftcon.expiration_date} 까지</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품금액</p>
						<p className='text-sm font-medium '> {giftcon.price} 원</p>
					</div>
				</section>
				<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
					<div className='mt-2 mb-2 text-lg font-semibold'>내주변 사용처</div>
					<div className='w-full'>
						<NearbyStoreMap searchKeyword={giftcon.store} />
					</div>
				</section>
			</main>
		</div>
	);
};

export default GiftconPostDetail;
