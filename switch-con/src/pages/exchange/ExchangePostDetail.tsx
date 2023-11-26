import GiftCard from '@components/ui/GiftCard';
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
			<main className='px-6 pt-16 pb-4'>
				<div className='mt-2 mb-2 text-lg font-semibold'> {giftcons.product} 어쩌구 교환권</div>
				<div className='w-full mr-2 overflow-hidden rounded-md'>
					<AspectRatio.Root ratio={1 / 1}>
						<img src={giftcons.gifticon_img} className='object-cover w-full h-full' />
					</AspectRatio.Root>
				</div>

				<article className='mt-5 bg-white rounded-md '>
					<div className='px-2 py-2'>
						<p className='mb-3 font-bold text-medium'>기프티콘 정보</p>
						<div className='flex flex-col gap-1'>
							<div className='grid grid-cols-2'>
								<p className='text-sm font-semibold text-green-900'>제품 종류</p>
								<p className='text-sm'>{giftcons.product}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-sm font-semibold text-green-900'>사용처</p>
								<p className='text-sm'>{giftcons.store}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-sm font-semibold text-green-900'>유효기간</p>
								<p className='text-sm'>{giftcons.expiration_date}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-sm font-semibold text-green-900'>제품 금액</p>
								<p className='text-sm'>{giftcons.price}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-sm font-semibold text-green-900'>교환선호제품</p>
								<p className='text-sm'>{giftcons.category}</p>
							</div>
						</div>
					</div>
				</article>
				<article className='relative mt-5'>
					<div className='py-2 '>
						<p className='mb-3 font-bold text-medium'>현재까지 교환신청 목록</p>
						<hr className='mb-2' />
						<div className='relative flex flex-col gap-2'>
							<button className='w-3/6 translate-x-40 z-50 sticky top-[600px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'>
								교환 신청
							</button>
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
							<GiftCard gifticon={giftcons} hoverOff />
						</div>
					</div>
				</article>
			</main>
		</>
	);
};

export default ExchangePostDetail;
