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
import { gifticonExchangeRequestPost } from '@api/ExchangeAPI';
import { getAllGifticon } from '@api/GiftconAPI';

const giftcons = [
	{
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
	},
	{
		exchangePost_id: 2,
		gifticon_img: '/images/image_url_2.jpg',
		category: '디저트',
		store: '배스킨라빈스',
		product: '사랑에 빠진 딸기',
		expiration_date: '2024-02-14',
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
		expiration_date: '2024-03-30',
		barcode_num: '3456789012',
		price: 20000,
		is_used: false,
		is_active: true,
		created_at: '2023-11-24',
		modfied_at: '2023-11-24',
	},
	// {
	// 	exchangePost_id: 4,
	// 	gifticon_img: '/images/image_url_3.jpg',
	// 	category: '푸드',
	// 	store: '피자헛',
	// 	product: '슈퍼슈프림 피자',
	// 	expiration_date: '2024-03-30',
	// 	barcode_num: '3456789012',
	// 	price: 20000,
	// 	is_used: false,
	// 	is_active: true,
	// 	created_at: '2023-11-24',
	// 	modfied_at: '2023-11-24',
	// },
];
const ExchangeRequest = () => {
	const [selectedGiftIcon, setSelectedGiftIcon] = useState(null);

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

	const handleGiftIconSelect = (_giftIconId, giftIconData) => {
		setSelectedGiftIcon(giftIconData);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// const response = await
		console.log('Form submitted with gift icon:', selectedGiftIcon);

		if (!selectedGiftIcon) {
			// Handle case where no gifticon is selected
			console.error('Please select a gifticon before submitting.');
			return;
		}
		try {
			// Call the exchange request function with the selected gifticon's ID
			const responseStatus = await gifticonExchangeRequestPost(selectedGiftIcon.exchangePostId);

			if (responseStatus >= 200 && responseStatus < 300) {
				// Successful exchange request
				console.log('Exchange request successful');
				// Add any additional logic or navigation here
			} else {
				// Handle error response
				console.error('Exchange request failed:', responseStatus);
			}
		} catch (error) {
			// Handle network or other errors
			console.error('Error during exchange request:', error);
		}
	};
	return (
		<div className='pb-6 '>
			<Header headline='기프티콘 교환 요청' />
			<main className='px-6 pt-16 pb-4'>
				<div className='flex items-end justify-between mb-4'>
					<p className='font-semibold'>내 기프티콘</p>
				</div>
				<form onSubmit={handleSubmit} id='exchange_request' className='flex flex-col gap-2'>
					{/* {giftcons.map((gifticon) => {
						return (
							<GiftCard
								key={gifticon.gifticonId}
								gifticon={gifticon}
								onClick={() => handleGiftIconSelect(gifticon.gifticonId)} // 변경된 부분
								selected={selectedGiftIcon === gifticon.gifticonId}
							>
								<input type='radio' value={gifticon.gifticonId.toString()} hidden />
							</GiftCard>
						);
					})} */}
					{giftcons.map((gifticon) => {
						return (
							<GiftCard
								key={gifticon.exchangePost_id}
								gifticon={gifticon}
								onClick={() => handleGiftIconSelect(gifticon.exchangePost_id, gifticon)}
								selected={selectedGiftIcon === gifticon.exchangePost_id}
							>
								{/* <input type='radio' value={gifticon.exchangePost_id.toString()} hidden /> */}
							</GiftCard>
						);
					})}
				</form>
			</main>
			<AlertDialog>
				<AlertDialogTrigger>
					<button className='fixed bottom-4 translate-x-[200px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'>
						교환 신청
					</button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>선택한 기프티콘으로 교환신청 하시겠습니까?</AlertDialogTitle>
						<AlertDialogDescription>
							교환 신청한 기프티콘은 사용이 불가합니다. (단, 교환요청 취소 시 사용 가능)
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button type='submit' form='exchange_request'>
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

export default ExchangeRequest;
