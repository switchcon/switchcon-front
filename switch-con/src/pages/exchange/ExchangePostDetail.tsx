import { getGifticonDetailPost, gifiticonExchangeAccept, gifticonExchangeDelete } from '@api/ExchangeAPI';
import ExchangeReqCard from '@components/ui/ExchangeReqCard';
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

const ExchangePostDetail = () => {
	const router = useNavigate();

	const { id } = useParams();

	//id값으로 교환상세페이지 데이터 호출
	const [gifticon, setGifticon] = useState(null); //상세페이지 데이터
	const [selectedGiftIcon, setSelectedGiftIcon] = useState(null); //교환할 기프티콘 선택
	const [showAlertModal, setShowAlertModal] = useState(false); //교환요청완료 모달
	const [alertMessage, setAlertMessage] = useState('');
	const current_memberId = useRecoilValue(getUserId); //현재 유저의 ID

	const fetchGifticonDetail = async () => {
		try {
			const data = await getGifticonDetailPost(parseInt(id, 10));
			setGifticon(data);
			console.log('exchange detail data ', data);
		} catch (error) {
			console.error();
		}
	};

	const handleGifticonDelete = async () => {
		try {
			const response_status = await gifticonExchangeDelete(parseInt(id, 10));
			if (response_status >= 200 && response_status < 300) {
				console.log('삭제성공');
				router('/exchange-home');
			}
		} catch (error) {
			console.error();
		}
	};
	const handleExchangeAccept = async () => {
		try {
			console.log('교환수락');
			const accept_exchange = await gifiticonExchangeAccept(parseInt(id, 10), selectedGiftIcon.exchangeRequestId);
			//교환 완료되었음을 알리는 모달
			if (accept_exchange === 200) {
				setAlertMessage('교환이 완료되었습니다.');
				setShowAlertModal(true);
			}
			//교환 수락 후 홈화면으로 가기
		} catch (error) {
			setAlertMessage('교환요청에 실패했습니다.');
			setShowAlertModal(true);
		}
	};
	//처음 렌더링시 데이터 불러옴
	useEffect(() => {
		fetchGifticonDetail();
		console.log('current_memberId', current_memberId);
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

					<article className='relative mt-5'>
						<div className='py-2 '>
							<p className='mb-3 font-bold text-medium'>현재까지 교환신청 목록</p>
							<hr className='mb-2' />
							<div className='relative flex flex-col gap-2'>
								{gifticon.memberId === current_memberId
									? // 내 기프티콘인 경우
									  gifticon.reqListDTO.length > 0 &&
									  gifticon.reqListDTO.map((reqGifticon) => (
											<ExchangeReqCard
												key={reqGifticon.exchangeRequestId}
												gifticon={reqGifticon}
												onClick={() => setSelectedGiftIcon(reqGifticon)}
												selected={selectedGiftIcon?.exchangeRequestId === gifticon.exchangeRequestId}
											/>
									  ))
									: // 타인인 경우
									  gifticon.reqListDTO.length > 0 &&
									  gifticon.reqListDTO.map((reqGifticon) => (
											<ExchangeReqCard key={reqGifticon.exchangeRequestId} gifticon={reqGifticon} hoverOff />
									  ))}
							</div>
							{/* 자신의 게시글이면 교환 수락 버튼, 아니면 교환 신청버튼 */}
							{gifticon.memberId === current_memberId ? (
								<div className='flex justify-between'>
									<AlertDialog>
										<AlertDialogTrigger>
											<Button variant='redbtn' className='mt-4 mb-2'>
												게시글 삭제
											</Button>
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
								</div>
							) : (
								<Button className='mt-4 mb-2'>
									<Link to={`/exchange-request/${id}`}>교환 신청</Link>
								</Button>
							)}

							{/* 교환수락 후 확인 모달 */}

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
					</article>
				</main>
			)}
		</>
	);
};

export default ExchangePostDetail;
