import Footer from '@components/ui/Footer';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
		exchangeReq_count: 3,
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
		exchangeReq_count: 4,
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
		exchangeReq_count: 6,
	},
];

const ExchangeHome = () => {
	return (
		<>
			<Header headline='교환 홈' navigaterOff>
				<IoIosSearch size={'20'} />
				<IoMdNotificationsOutline size={'20'} className='ml-3 mr-4' />
			</Header>
			<main className='px-6 pt-16'>
				<div className='flex items-end justify-between mb-4'>
					<p className='font-semibold'>교환 게시물</p>
					<p className='text-xs'>유효기간 임박순</p>
				</div>
				<div className='flex flex-col gap-2'>
					{giftcons.map((gifticon) => {
						return (
							<Link key={gifticon.exchangePost_id} to={`/exchange/${gifticon.exchangePost_id}`}>
								<GiftCard gifticon={gifticon}>
									<div className='flex items-center justify-between'>
										<div className='font-semibold'>약 {gifticon.price}원 </div>
										<div className='flex items-center gap-2'>
											<FaCommentAlt className='text-brand-primary-light' size={'18'} />
											{gifticon.exchangeReq_count}
										</div>
									</div>
								</GiftCard>
							</Link>
						);
					})}
				</div>
			</main>
			<Footer selectedMenu='exchange' />
			<button className='w-[375px] fixed bottom-20 left-[300px]'>
				<FaCirclePlus size={'40'} className='text-brand-primary-normal hover:text-brand-primary-light' />
			</button>
		</>
	);
};

export default ExchangeHome;
