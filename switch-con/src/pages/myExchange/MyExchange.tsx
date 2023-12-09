import React, { useEffect, useState } from 'react';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Footer from '@components/ui/Footer';
import { Badge } from '@components/ui/badge';
import { exchangePost, exchangeRequest } from '@api/UserApi';

const MyExchange = () => {
	const [giftcon, setGiftcons] = useState([]);
	const fetchExchangePost = async () => {
		try {
			const giftcon = await exchangePost();
			setGiftcons(giftcon);
			console.log(giftcon);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchExchangePost();
	}, []);

	const [gifticons, setGifticons] = useState([]);
	const fetchExchangeRequest = async () => {
		try {
			const gifticons = await exchangeRequest();
			setGifticons(gifticons);
			console.log(gifticons);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchExchangeRequest();
	}, []);

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
							{giftcon.map((gifticon) => {
								return (
									<Link key={gifticon.gifticonId} to={`/exchange/${gifticon.exchangePostId}`}>
										<Badge>{[gifticon.status]}</Badge>
										<GiftCard
											gifticon={gifticon}
											accepted={gifticon.status === 'accepted'}
											exchanged={gifticon.status === 'COMPLETE'}
											rejected={gifticon.status === 'REJECTED'}
										/>
										<div className='h-[15px] relative flex items-center gap-2 bottom-8 left-[285px] z-10'>
											<FaCommentAlt className='text-brand-primary-light' size={'18'} />
											{gifticon.requestCnt}
										</div>
									</Link>
								);
							})}
							{/* {giftcons} */}
						</div>
					</TabsContent>
					<TabsContent value='request_post'>
						<div className='flex flex-col'>
							{gifticons &&
								gifticons.map((gifticon) => {
									return (
										<Link key={gifticon.gifticonId} to={`/exchange/${gifticon.exchangePostId}`}>
											<Badge>{[gifticon.status]}</Badge>
											<GiftCard
												gifticon={gifticon}
												accepted={gifticon.status === 'ACCEPTED'}
												exchanged={gifticon.status === 'COMPLETE'}
												rejected={gifticon.status === 'REJECTED'}
											/>
											{''}
											{/*교환완료의 경우 오버레이 */}
											<div className='h-[15px] relative flex items-center gap-2 bottom-8 left-[285px]'>
												<FaCommentAlt className='text-brand-primary-light' size={'18'} />
												{gifticon.requestCnt}
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
