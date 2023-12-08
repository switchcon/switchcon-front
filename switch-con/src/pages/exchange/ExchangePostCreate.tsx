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

const ExchangePostCreate = () => {
	const [giftcons, setGiftcons] = useState([]);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const fetchGiftcons = async (sortType: string) => {
		try {
			const giftcons = await getAllGifticon(sortType);
			//active인 기프티콘만 등록가능하도록 리스트업.abs
			// const activeGifticons = giftcons.filter((item) => item.active == true);
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (selectedGiftIcon) {
				const response = await gifticonExchangePost(selectedGiftIcon.gifticonId, selectedGiftIcon.category);
				if (response === 200) {
					setAlertMessage('교환게시글을 등록했습니다.');
					setShowAlertModal(true);
				}
			}
		} catch (error) {
			setAlertMessage('교환게시글 등록에 실패했습니다.');
			setShowAlertModal(true);
			console.error(error);
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
							<GiftCard
								key={gifticon.gifticonId}
								gifticon={gifticon}
								onClick={() => setSelectedGiftIcon(gifticon.gifticonId)}
								selected={selectedGiftIcon === gifticon.gifticonId}
							>
								<input type='radio' value={gifticon.gifticonId.toString()} hidden />
							</GiftCard>
						);
					})}
				</form>
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
			{/* 교환등록확인모달 */}
			{showAlertModal && (
				<AlertDialog>
					<AlertDialogTrigger>
						<Button id='alertDialogButton' className='hidden w-3/5' />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle> {alertMessage}</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogAction asChild>
								<Button onClick={() => setShowAlertModal(false)}>확인</Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
};

export default ExchangePostCreate;
