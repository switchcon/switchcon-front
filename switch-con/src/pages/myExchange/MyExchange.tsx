import React from 'react';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Footer from '@components/ui/Footer';
import { Badge } from '@components/ui/badge';

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
		status: 'rejected',
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
		status: 'accepted',
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
		status: 'waiting',
	},
];

const post_status = {
	in_progress: '진행중',
	complete: '완료',
	cancle: '취소',
};
const status = {
	waiting: '대기중',
	accepted: '수락됨',
	rejected: '거절됨',
};
const MyExchange = () => {
	return (
		<>
			<Header headline='내 콘' navigaterOff>
				<IoIosSearch size={'20'} />
				<IoMdNotificationsOutline size={'20'} className='ml-3 mr-4' />
			</Header>
			<Tabs defaultValue='my_post' className='flex flex-col justify-center gap-2'>
				<TabsList className='flex gap-4 px-2 mt-16 mb-4'>
					<TabsTrigger value='my_post'>내 교환등록 글</TabsTrigger>
					<TabsTrigger value='request_post'>교환신청 글</TabsTrigger>
				</TabsList>
				<main className='px-6'>
					<TabsContent value='my_post'>
						<div className='flex flex-col'>
							{giftcons.map((gifticon) => {
								return (
									<Link key={gifticon.exchangePost_id} to={`/exchange/${gifticon.exchangePost_id}`}>
										<GiftCard exchanged={gifticon.status === 'accepted'} gifticon={gifticon} />
										<div className='h-[15px] relative flex items-center gap-2 bottom-8 left-[285px] z-10'>
											<FaCommentAlt className='text-brand-primary-light' size={'18'} />
											{gifticon.exchangeReq_count}
										</div>
									</Link>
								);
							})}
						</div>
					</TabsContent>
					<TabsContent value='request_post'>
						<div className='flex flex-col'>
							{giftcons.map((gifticon) => {
								return (
									<Link key={gifticon.exchangePost_id} to={`/exchange/${gifticon.exchangePost_id}`}>
										<Badge>{status[gifticon.status]}</Badge>
										<GiftCard gifticon={gifticon} exchanged={gifticon.status === 'exchanged'} />{' '}
										{/*교환완료의 경우 오버레이 */}
										<div className='h-[15px] relative flex items-center gap-2 bottom-8 left-[285px]'>
											<FaCommentAlt className='text-brand-primary-light' size={'18'} />
											{gifticon.exchangeReq_count}
										</div>
									</Link>
								);
							})}
						</div>
					</TabsContent>
				</main>
			</Tabs>
			<Footer selectedMenu='myExchange' />
		</>
	);
};

export default MyExchange;
