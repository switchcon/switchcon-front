/* eslint-disable */ //warning 무시
import { RiHome2Line } from 'react-icons/ri';
import { GiCardExchange } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='fixed z-50 h-16 bottom-0 border-t border-gray-200 bg-white w-[375px] shadow-sm'>
			<div className='grid h-full grid-cols-3 mx-auto text-sm font-semibold'>
				<div className='hover:text-brand-primary-normal flex flex-col justify-center items-center hover:bg-gray-50'>
					<RiHome2Line size={'20'} />
					<p>홈</p>
				</div>
				<div className='hover:text-brand-primary-normal flex flex-col justify-center items-center hover:bg-gray-50 '>
					<GiCardExchange size={'20'} />
					<p>교환</p>
				</div>
				<div className='hover:text-brand-primary-normal flex flex-col justify-center items-center hover:bg-gray-50'>
					<FaRegUser size={'20'} />
					<p>내 교환</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
