import Header from '@components/ui/Header';
import { useRef, useState, useEffect } from 'react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Button } from '@components/ui/button';
import { ocrPost, postGifticon } from '@api/GiftconAPI';
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
import { useNavigate } from 'react-router';
const default_img = '/images/defaultImg.png';

// const category_list = {
// 	cafe: '커피/음료',
// 	bakery: '베이커리/도넛',
// 	chicken: '치킨/피자',
// 	beauty: '뷰티',
// 	culture: '도서/문화/영화/음악',
// };
const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};
const GiftconRegisterPage = () => {
	const router = useNavigate();

	const [gifticonImg, setGifticonImg] = useState(default_img);
	// const [category, setCategory] = useState(null);
	const [analyzedGifticon, setAnalyzedGifticon] = useState(null);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [AlertMessage, setAlertMessage] = useState('');
	const fileInputRef = useRef(); //파일 업로드를 위한 ref

	const getOcrAnalysis = async (file: File) => {
		try {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = async () => {
				const base64Image = reader.result as string;
				const base64Data = base64Image.split(',')[1];
				const ocrAnalysis = await ocrPost(base64Data);
				console.log('response', ocrAnalysis);
				if (ocrAnalysis.status === 200) {
					setAnalyzedGifticon(ocrAnalysis.data);
				} else {
					console.log('ocr 에러');
					setAlertMessage('유효하지 않은 기프티콘입니다. (유효기간 만료)');
					setShowAlertModal(true);
				}
			};
		} catch (error) {
			console.error('Ocr test fail');
		}
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			//파일 읽는 동작이 끝나면 발생하는 이벤트
			setGifticonImg(reader.result as string); //reader.result는 string 또는 ArrayBuffer 타입을 반환하기 때문에 string 형 명시
		};
	};
	//파일 등록시 호출
	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.match('image.*')) {
			previewFile(file);
			getOcrAnalysis(file);
		} else {
			setGifticonImg(default_img);
		}
	};
	const onSubmitButton = async () => {
		try {
			const { active, ...giftconWithoutActive } = analyzedGifticon;
			const postReq = await postGifticon({
				...giftconWithoutActive,
				expireDate: formatDate(analyzedGifticon.expireDate),
			});
			if (postReq !== 200) {
				throw Error;
			} else {
				setAlertMessage('기프티콘 등록에 성공했습니다.');
				setShowAlertModal(true);
			}
		} catch (error) {
			console.error('기프티콘 등록실패'), error;
			setAlertMessage('기프티콘 등록에 실패했습니다.');
			setShowAlertModal(true);
		}
	};
	const onClickModal = () => {
		setShowAlertModal(false); //postReq가 정상요청되었으면 /home 으로 이동, 기프티콘 등록실패일 경우 모달창만 닫기.
		if (AlertMessage === '기프티콘 등록에 성공했습니다.') {
			router('/home');
		}
	};
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
			<Header headline={'기프티콘 등록'} />
			<main className='px-6 pt-16 pb-12'>
				<div className='mt-2 mb-2 text-lg font-semibold'>기프티콘 선택</div>
				<div className='w-full px-6 py-6 overflow-hidden bg-white rounded-md'>
					<AspectRatio.Root ratio={9 / 16}>
						<img src={gifticonImg} className='object-cover w-full h-full' />
					</AspectRatio.Root>
				</div>
				<div className='mb-3'>
					<input
						ref={fileInputRef}
						className='mt-2 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-brand-primary-normal file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-brand-primary-light focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none '
						type='file'
						id='file-upload'
						onChange={handleFileInputChange}
						multiple
					/>
				</div>
				<div className='mt-2 mb-2 text-lg font-semibold'>기프티콘 정보</div>
				{analyzedGifticon !== null ? (
					<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
						<div className='flex flex-col'>
							<p className='mb-2 text-sm font-semibold text-green-900'> 제품 종류</p>
							<div className='flex justify-between'>
								<p className='text-sm font-medium '> {analyzedGifticon.category}</p>
								{/* <Select>
									<SelectTrigger className='w-[150px]'>
										<SelectValue placeholder='직접선택' />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(category_list).map(([key, value]) => (
											<SelectItem
												key={key}
												value={key}
												onChange={() => {
													setCategory(value); //변경시 카테고리 반영안됨.
												}}
											>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select> */}
							</div>
						</div>
						<div className='flex flex-col'>
							<p className='mb-2 text-sm font-semibold text-green-900'> 사용처</p>
							<p className='text-sm font-medium '> {analyzedGifticon.store}</p>
						</div>
						<div className='flex flex-col'>
							<p className='mb-2 text-sm font-semibold text-green-900'> 제품명</p>
							<p className='text-sm font-medium '> {analyzedGifticon.product}</p>
						</div>
						<div className='flex flex-col'>
							<p className='mb-2 text-sm font-semibold text-green-900'> 유효기간</p>
							<p className='text-sm font-medium '> {analyzedGifticon.expireDate} 까지</p>
						</div>
						<div className='flex flex-col'>
							<p className='mb-2 text-sm font-semibold text-green-900'> 제품금액</p>
							<p className='text-sm font-medium '> {analyzedGifticon.price} 원</p>
						</div>
					</section>
				) : (
					<section className='px-2 py-3 text-sm bg-white rounded-md'>기프티콘을 등록해주세요!</section>
				)}
				<AlertDialog>
					<AlertDialogTrigger>
						<Button className='px-8 mt-4 ml-14 full'>기프티콘 등록</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>기프티콘을 등록하시겠습니까?</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>취소</AlertDialogCancel>
							<AlertDialogAction asChild>
								<Button onClick={onSubmitButton}>확인</Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				{/* 기프티콘 등록 요청 후 성공 실패 확인 모달 */}
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
								<Button onClick={onClickModal}>확인</Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</main>
		</div>
	);
};

export default GiftconRegisterPage;
