import Footer from '@components/ui/Footer';
import GiftCard from '@components/ui/GiftCard';
import Header from '@components/ui/Header';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllExchangePost } from '@api/ExchangeAPI';
import { useState, useEffect } from 'react';
const ExchangeHome = () => {
	const [exchangePosts, setExchangePosts] = useState([]);
	const fetchPosts = async (sortType: string) => {
		try {
			const posts = await getAllExchangePost(sortType);
			setExchangePosts(posts);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		//sortType: all(전체), under10000, upTo10000, upTo300000, upTo500000, upTo70000, upTo100000
		fetchPosts('all');
	}, []);
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
				<div className='flex flex-col'>
					{exchangePosts.map((post) => {
						return (
							<Link key={post.exchangePostId} to={`/exchange/${post.exchangePostId}`}>
								<GiftCard gifticon={post} />
								<div className='h-[15px] relative flex items-center gap-2 bottom-8 left-[285px]'>
									<FaCommentAlt className='text-brand-primary-light' size={'18'} />
									{post.requestCnt}
								</div>
							</Link>
						);
					})}
				</div>
			</main>
			<Footer selectedMenu='exchange' />
			<button className='w-[375px] fixed bottom-20 translate-x-72'>
				<FaCirclePlus size={'40'} className='text-brand-primary-normal hover:text-brand-primary-light' />
			</button>
		</>
	);
};

export default ExchangeHome;
