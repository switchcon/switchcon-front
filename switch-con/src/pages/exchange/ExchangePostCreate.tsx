'use client';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { getAllGifticon } from '@api/GiftconAPI';
import { gifticonExchangePost } from '@api/ExchangeAPI';

const giftcons = [
	{
		exchangePost_id: 1,
		gifticon_img: '/images/image_url_1.jpg',
		category: '음료',
		store: '스타벅스',
		product: '아메리카노',
		expireDate: '2024-01-01',
		barcode_num: '1234567890',
		price: 5000,
		is_used: false,
		is_active: true,
		created_at: '2023-11-22',
		modfied_at: '2023-11-22',
	},
	{
		exchangePost_id: 2,
		gifticon_img: '/images/image_url_2.jpg',
		category: '디저트',
		store: '배스킨라빈스',
		product: '사랑에 빠진 딸기',
		expireDate: '2024-02-14',
		barcode_num: '2345678901',
		price: 8000,
		is_used: false,
		is_active: true,
		created_at: '2023-11-23',
		modfied_at: '2023-11-23',
	},
	{
		exchangePost_id: 3,
		gifticon_img: '/images/image_url_3.jpg',
		category: '푸드',
		store: '피자헛',
		product: '슈퍼슈프림 피자',
		expireDate: '2024-03-30',
		barcode_num: '3456789012',
		price: 20000,
		is_used: false,
		is_active: true,
		created_at: '2023-11-24',
		modfied_at: '2023-11-24',
	},
	{
		exchangePost_id: 4,
		gifticon_img: '/images/image_url_3.jpg',
		category: '푸드',
		store: '피자헛',
		product: '슈퍼슈프림 피자',
		expireDate: '2024-03-30',
		barcode_num: '3456789012',
		price: 20000,
		is_used: false,
		is_active: true,
		created_at: '2023-11-24',
		modfied_at: '2023-11-24',
	},
];

const ExchangePostCreate = () => {
	const [giftcons, setGiftcons] = useState([]);
	const fetchGiftcons = async (sortType: string) => {
		try {
			const giftcons = await getAllGifticon(sortType);
			setGiftcons(giftcons);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		//sortType: latest (최신등록순), expiringSoon(유효기간임박순), highPrice(높은 가격순), lowPrice(낮은가격순)
		fetchGiftcons('latest');
	}, []);

	const [selectedGiftIcon, setSelectedGiftIcon] = useState(null);
	const [exchangeStatus, setExchangeStatus] = useState(null);
	const handleSubmit = async (event) => {
		event.preventDefault();
		// const response = await
		try {
			if (exchangeStatus === 'registering') {
				console.log('이미 교환 등록 중입니다.');
				return;
			}

			if (selectedGiftIcon) {
				setExchangeStatus('registering'); // 교환 등록 중인 상태로 변경

				const selectedGift = giftcons.find((gifticon) => gifticon.gifticonId === selectedGiftIcon);

				if (selectedGift) {
					const response = await gifticonExchangePost(selectedGift.gifticonId, selectedGift.category);
					setSelectedGiftIcon(response);
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			setExchangeStatus(null); // 교환 등록 상태 초기화
		}

		console.log('Form submitted with gift icon:', selectedGiftIcon);
	};

	return (
		<div className='pb-6 '>
			<Header headline='교환 기프티콘 등록' />
			<main className='px-6 pt-16 pb-4'>
				<div className='flex items-end justify-between mb-4'>
					<p className='font-semibold'></p>
				</div>
				<form onSubmit={handleSubmit} id='exchange_post' className='flex flex-col gap-2'>
					{giftcons.map((gifticon) => {
						return (
							<>
								<GiftCard
									key={gifticon.gifticonId}
									gifticon={gifticon}
									onClick={() => setSelectedGiftIcon(gifticon.gifticonId)}
									selected={selectedGiftIcon === gifticon.gifticonId}
								>
									<input type='radio' value={gifticon.gifticonId.toString()} hidden />
								</GiftCard>
							</>
						);
					})}
				</form>
				{/* {giftcons.map((gifticon) => {
						return (
							<Link key={gifticon.giftconId} to={`/home/giftcon/${gifticon.gifticonId}`}>
								<GiftCard gifticon={gifticon} />
							</Link>
						);
					})} */}
			</main>
			<AlertDialog>
				<AlertDialogTrigger>
					<button className='fixed bottom-4 translate-x-[200px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'>
						교환 등록
					</button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>선택한 기프티콘으로 교환신청 글을 등록하시겠습니까?</AlertDialogTitle>
						<AlertDialogDescription>
							교환신청 글을 올린 기프티콘은 사용이 불가합니다. (단, 교환등록 글 삭제 시 사용 가능)
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button type='submit' form='exchange_post'>
								확인
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/*교환신청 로직 */}
		</div>
	);
};

export default ExchangePostCreate;
