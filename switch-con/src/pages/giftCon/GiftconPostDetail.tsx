import { getGifticon, gifticonDelete } from '@api/GiftconAPI';
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
import NearbyStoreMap from '@lib/kakaoMap';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GiftconPostDetail = () => {
	const { id } = useParams();
	const [gifticon, setGifticon] = useState(null); //상세페이지 데이터
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [AlertMessage, setAlertMessage] = useState('');

	const router = useNavigate();

	const fetchGifticonDetail = async () => {
		try {
			const data = await getGifticon(parseInt(id, 10));
			setGifticon(data);
		} catch (error) {
			console.error();
		}
	};

	const handleGifticonDelete = async () => {
		try {
			const response_status = await gifticonDelete(parseInt(id, 10));
			console.log(response_status);
			if (response_status >= 200 && response_status < 300) {
				console.log('삭제성공');
				setAlertMessage('삭제되었습니다.');
				setShowAlertModal(true);
			} else {
				console.log('delete error');
				setAlertMessage('교환중인 기프티콘은 삭제가 불가합니다.');
				setShowAlertModal(true);
			}
		} catch (error) {
			console.log('delete error');
		}
	};

	//처음 렌더링시 데이터 불러옴
	useEffect(() => {
		fetchGifticonDetail();
	}, []);

	//모달에서 삭제버튼 누를시 결과 띄워줄 부분
	useEffect(() => {
		if (showAlertModal) {
			const alertDialogButton = document.getElementById('alertDialogButton');
			if (alertDialogButton) {
				alertDialogButton.click();
				console.log(showAlertModal);
			}
		}
	}, [showAlertModal]);

	return (
		<div>
			<Header headline={'기프티콘 조회'} />
			{gifticon && (
				<main className='px-6 pt-16 pb-12'>
					<div className='mt-2 mb-2 text-lg font-semibold'>{gifticon.product} </div>

					<div className='w-full px-6 py-6 overflow-hidden bg-white rounded-md'>
						{/* 이미지 보여주는 곳  */}
						<AspectRatio.Root ratio={9 / 16}>
							<img src={`data:image/jpeg;base64,${gifticon.gifticonImg}`} className='object-cover w-full h-full' />
						</AspectRatio.Root>
					</div>
					<div className='mt-2 mb-2 text-lg font-semibold'>기프티콘 정보</div>
					<>
						<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
							<div className='flex flex-col'>
								<p className='mb-2 text-sm font-semibold text-green-900'> 제품 종류</p>
								<p className='text-sm font-medium '> {gifticon.category}</p>
							</div>
							<div className='flex flex-col'>
								<p className='mb-2 text-sm font-semibold text-green-900'> 사용처</p>
								<p className='text-sm font-medium '> {gifticon.store}</p>
							</div>
							<div className='flex flex-col'>
								<p className='mb-2 text-sm font-semibold text-green-900'> 제품명</p>
								<p className='text-sm font-medium '> {gifticon.product}</p>
							</div>
							<div className='flex flex-col'>
								<p className='mb-2 text-sm font-semibold text-green-900'> 유효기간</p>
								<p className='text-sm font-medium '> {gifticon.expireDate} 까지</p>
							</div>
							<div className='flex flex-col'>
								<p className='mb-2 text-sm font-semibold text-green-900'> 제품금액</p>

								<p className='text-sm font-medium '> {gifticon.price} 원</p>
							</div>
						</section>

						<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
							{/* 카카오 api key 요청 확인필요 현재 오류남 */}
							<div className='mt-2 mb-2 text-lg font-semibold'>내주변 사용처</div>
							<div className='w-full'>
								<NearbyStoreMap searchKeyword={gifticon.store} />
							</div>
						</section>
					</>
				</main>
			)}

			<AlertDialog>
				<AlertDialogTrigger>
					<Button className='mt-4 mb-2'>기프티콘 삭제</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>기프티콘을 삭제하시겠습니까?</AlertDialogTitle>
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
			{/* 기프티콘 삭제 요청 후 성공 실패 확인 모달 */}

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
									router('/home');
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

export default GiftconPostDetail;
