import { getAllExchangePost, getGifticonDetailPost, gifticonExchangeDelete } from '@api/ExchangeAPI';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import NearbyStoreMap from '@lib/kakaoMap';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
	//console.log('post ID', id);
	//id값으로 교환상세페이지 데이터 호출
	const [gifticon, setGifticon] = useState(null); //상세페이지 데이터
	const router = useNavigate();

	const fetchGifticonDetail = async () => {
		try {
			const data = await getGifticonDetailPost(parseInt(id, 10));
			setGifticon(data);
		} catch (error) {
			console.error();
		}
	};

	const handleGifticonDelete = async () => {
		try {
			const response_status = await gifticonExchangeDelete(parseInt(id, 10));
			console.log(response_status);
			if (response_status >= 200 && response_status < 300) {
				console.log('삭제성공');
				router('/exchange-home');
			}
		} catch (error) {
			console.error();
		}
	};

	//처음 렌더링시 데이터 불러옴
	useEffect(() => {
		fetchGifticonDetail();
	}, []);

	// const isUserOwner = () => {
	// 	// 게시물 소유자 여부 확인
	// 	return isUserLoggedIn() && gifticon && gifticon.user_id === getCurrentUserId();
	//   };

	return (
		<>
			<Header headline={'교환 기프티콘 상세'} />
			{gifticon && (
				<main className='px-6 pt-16 pb-4'>
					<div className='mt-2 mb-2 text-lg font-semibold'> {gifticon.product} </div>
					<div className='w-full mr-2 overflow-hidden rounded-md'>
						<AspectRatio.Root ratio={1 / 1}>
							<img src={`data:image/jpeg;base64,${gifticon.gifticonImg}`} className='object-cover w-full h-full' />
						</AspectRatio.Root>
					</div>

					<section className='mt-5 bg-white rounded-md '>
						<div className='px-2 py-2'>
							<p className='mb-3 font-bold text-medium'>기프티콘 정보</p>
							<div className='flex flex-col gap-1'>
								<div className='grid grid-cols-2'>
									<p className='text-sm font-semibold text-green-900'>제품 종류</p>
									<p className='text-sm'>{gifticon.product}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='text-sm font-semibold text-green-900'>사용처</p>
									<p className='text-sm'>{gifticon.store}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='text-sm font-semibold text-green-900'>유효기간</p>
									<p className='text-sm'>{gifticon.expiration_date}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='text-sm font-semibold text-green-900'>제품 금액</p>
									<p className='text-sm'>{gifticon.price}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='text-sm font-semibold text-green-900'>교환선호제품</p>
									<p className='text-sm'>{gifticon.category}</p>
								</div>
							</div>
						</div>
					</section>

					<AlertDialog>
						<AlertDialogTrigger>
							<Button className='mt-4 mb-2'>게시물 삭제</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>게시물을 삭제하시겠습니까?</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>취소</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button onClick={handleGifticonDelete} form='exchange_post'>
										확인
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<article className='relative mt-5'>
						<div className='py-2 '>
							<p className='mb-3 font-bold text-medium'>현재까지 교환신청 목록</p>
							<hr className='mb-2' />
							<div className='relative flex flex-col gap-2'>
								<GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff />
							</div>
							{/* <button className='w-3/6 translate-x-40 z-48 sticky top-[700px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'> */}
							<Button className='mt-4 mb-2'>
								<Link to={`/exchange-request/${giftcons.exchangePost_id}`}>교환 신청</Link>
							</Button>
						</div>
					</article>
				</main>
			)}
		</>
	);
};

export default ExchangePostDetail;
