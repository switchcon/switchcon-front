'use client';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { useState } from 'react';
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
	{
		exchangePost_id: 4,
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
];
const ExchangeRequest = () => {
	const [selectedGiftIcon, setSelectedGiftIcon] = useState(null);

	return (
		<div className='pb-6 '>
			<Header headline='기프티콘 교환 요청' />
			<main className='px-6 pt-16 pb-4'>
				<div className='flex items-end justify-between mb-4'>
					<p className='font-semibold'>내 기프티콘</p>
				</div>
				<form className='flex flex-col gap-2'>
					{giftcons.map((gifticon) => {
						return (
							<GiftCard
								key={gifticon.exchangePost_id}
								gifticon={gifticon}
								onClick={() => setSelectedGiftIcon(gifticon.exchangePost_id)}
								selected={selectedGiftIcon === gifticon.exchangePost_id}
							>
								<input type='radio' value={gifticon.exchangePost_id.toString()} hidden />
							</GiftCard>
						);
					})}
				</form>
			</main>
			<AlertDialog>
				<AlertDialogTrigger>Open</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your account and remove your data from our
							servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<button
				type='submit'
				className='fixed bottom-2 translate-x-[200px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'
			>
				교환 신청
			</button>
			{/*교환신청 로직 */}
		</div>
	);
};

export default ExchangeRequest;
