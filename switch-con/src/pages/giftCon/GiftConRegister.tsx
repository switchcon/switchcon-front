import Header from '@components/ui/Header';
import { useRef, useState } from 'react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
const example_img = '/images/image_url_1.jpg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Button } from '@components/ui/button';
import { ocrPost } from '@api/GiftconAPI';

const default_img = '/images/defaultImg.png';

const giftcons = {
	exchangePost_id: 1,
	gifticon_img: '/images/image_url_1.jpg',
	category: '식품/음료',
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

const category_list = {
	cafe: '커피/음료',
	bakery: '베이커리/도넛',
	chicken: '치킨/피자',
	beauty: '뷰티',
	culture: '도서/문화/영화/음악',
};
const GiftconRegisterPage = () => {
	const [gifticonImg, setGifticonImg] = useState(default_img);
	const [category, setCategory] = useState(giftcons.category);
	const [analyzedGifticon, setAnalyzedGifticon] = useState();
	const fileInputRef = useRef(); //파일 업로드를 위한 ref

	const getOcrAnalysis = async (file: File) => {
		try {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = async () => {
				const base64Image = reader.result as string;
				const base64Data = base64Image.split(',')[1];
				const ocrAnalysis = await ocrPost(base64Data);
				console.log(ocrAnalysis);
				setAnalyzedGifticon(ocrAnalysis);
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
				<section className='flex flex-col gap-4 px-2 py-3 bg-white rounded-md'>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품 종류</p>
						<div className='flex justify-between'>
							<p className='text-sm font-medium '> {category}</p>
							<Select>
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
							</Select>
						</div>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 사용처</p>
						<p className='text-sm font-medium '> {giftcons.store}</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품명</p>
						<p className='text-sm font-medium '> {giftcons.product}</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 유효기간</p>
						<p className='text-sm font-medium '> {giftcons.expiration_date} 까지</p>
					</div>
					<div className='flex flex-col'>
						<p className='mb-2 text-sm font-semibold text-green-900'> 제품금액</p>
						<p className='text-sm font-medium '> {giftcons.price} 원</p>
					</div>
				</section>
				<Button className='w-3/5 mt-8 ml-16'>기프티콘 등록</Button>
			</main>
		</div>
	);
};

export default GiftconRegisterPage;
