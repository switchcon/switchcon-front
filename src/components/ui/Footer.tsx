import { RiHome2Line } from 'react-icons/ri';
import { GiCardExchange } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = ({ selectedMenu }: { selectedMenu: string }) => {
	return (
		<footer className='fixed z-50 h-16 bottom-0 border-t border-gray-200 bg-white w-[375px] shadow-sm'>
			<div className='grid h-full grid-cols-3 mx-auto text-sm font-semibold'>
				<Link
					to='/home'
					className={`flex flex-col items-center justify-center ${
						selectedMenu === 'home' ? 'text-brand-primary-normal' : ''
					} hover:text-brand-primary-normal hover:bg-gray-50`}
				>
					<RiHome2Line size={'20'} />
					<p>홈</p>
				</Link>
				<Link
					to='/exchange-home'
					className={`flex flex-col items-center justify-center ${
						selectedMenu === 'exchange' ? 'text-brand-primary-normal' : ''
					} hover:text-brand-primary-normal hover:bg-gray-50 `}
				>
					<GiCardExchange size={'20'} />
					<p>교환</p>
				</Link>
				<Link
					to='/my-con'
					className={`flex flex-col items-center justify-center ${
						selectedMenu === 'myExchange' ? 'text-brand-primary-normal' : ''
					} hover:text-brand-primary-normal hover:bg-gray-50`}
				>
					<FaRegUser size={'20'} />
					<p>내 교환</p>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
