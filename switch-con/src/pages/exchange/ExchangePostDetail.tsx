import { getGifticonDetailPost, gifticonExchangeDelete } from '@api/ExchangeAPI';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { getUserId } from '@lib/state';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

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
	const current_memberId = useRecoilValue(getUserId); //현재 유저의 ID
	const router = useNavigate();

	const fetchGifticonDetail = async () => {
		try {
			const data = await getGifticonDetailPost(parseInt(id, 10));
			setGifticon(data);
			console.log('data ', data);
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
	const handleExchangeAccept = async () => {
		console.log('handle');
	};
	//처음 렌더링시 데이터 불러옴
	useEffect(() => {
		fetchGifticonDetail();
		console.log('current_memberId', current_memberId);
	}, []);

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
									<p className='text-sm'>{gifticon.expireDate}</p>
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
							{gifticon.memberid === current_memberId ? <Button className='mt-4 mb-2'>게시물 삭제</Button> : null}
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
								{/* <GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff />
								<GiftCard gifticon={giftcons} hoverOff /> */}
							</div>
							{/* 자신의 게시글이면 교환 수락 버튼, 아니면 교환 신청버튼 */}
							{gifticon.memberId === current_memberId ? (
								<AlertDialog>
									<AlertDialogTrigger>
										<Button className='mt-4 mb-2'>교환 수락</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>해당 기프티콘으로 교환 수락하시겠습니까?</AlertDialogTitle>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>취소</AlertDialogCancel>
											<AlertDialogAction asChild>
												<Button onClick={handleExchangeAccept} form='exchange_post'>
													확인
												</Button>
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							) : (
								<Button className='mt-4 mb-2'>
									<Link to={`/exchange-request/${giftcons.exchangePost_id}`}>교환 신청</Link>
								</Button>
							)}
						</div>
					</article>
				</main>
			)}
		</>
	);
};

export default ExchangePostDetail;
