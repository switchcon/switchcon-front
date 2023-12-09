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
import { useNavigate, useParams } from 'react-router-dom';

const ExchangeRequest = () => {
	const router = useNavigate();
	const { id } = useParams();
	const postId = parseInt(id, 10); //교환포스트 ID
	const [selectedGiftIcon, setSelectedGiftIcon] = useState(null);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [AlertMessage, setAlertMessage] = useState('');

	const [giftcons, setGiftcons] = useState([]);
	const fetchGiftcons = async (sortType: string) => {
		try {
			const giftcons = await getAllGifticon(sortType);
			//교환가능 상태인 기프티콘만 목록에 띄우도록
			const availableGiftcons = giftcons.filter((giftcon) => giftcon.active == true && giftcon.used == false);
			setGiftcons(giftcons);
			console.log('giftcons', giftcons);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		//sortType: latest (최신등록순), expiringSoon(유효기간임박순), highPrice(높은 가격순), lowPrice(낮은가격순)
		fetchGiftcons('latest');
	}, []);

	useEffect(() => {
		if (showAlertModal) {
			const alertDialogButton = document.getElementById('alertDialogButton');
			if (alertDialogButton) {
				alertDialogButton.click();
				console.log(showAlertModal);
			}
		}
	}, [showAlertModal]);
	//교환요청
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (selectedGiftIcon) {
				const responseStatus = await gifticonExchangeRequestPost(postId, selectedGiftIcon.gifticonId);
				if (responseStatus == 200) {
					setAlertMessage('교환 요청되었습니다.');
					setShowAlertModal(true);
				}
			}
		} catch (error) {
			console.log('error');
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
					{giftcons.map((gifticon) => {
						return (
							<GiftCard
								key={gifticon.gifticonId}
								gifticon={gifticon}
								onClick={() => setSelectedGiftIcon(gifticon)}
								selected={selectedGiftIcon?.gifticonId === gifticon.gifticonId}
							>
								<input type='radio' value={gifticon.gifticonId.toString()} hidden />
							</GiftCard>
						);
					})}
				</form>
			</main>
			<AlertDialog>
				<AlertDialogTrigger>
					<button
						disabled={!selectedGiftIcon}
						className='fixed bottom-4 translate-x-[200px] hover:bg-brand-primary-light hover:ring hover:ring-[#7cd6a5] hover:ring-offset-0 px-8 py-2 font-bold text-white rounded-full bg-brand-primary-normal'
					>
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
			{/* 교환 요청 후 성공 확인 모달 */}
			<AlertDialog>
				<AlertDialogTrigger>
					<Button id='alertDialogButton' className='hidden w-3/5' />
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle> {AlertMessage}</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction asChild>
							<Button
								onClick={() => {
									router(`/exchange/${postId.toString()}`);
								}}
							>
								확인
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ExchangeRequest;
