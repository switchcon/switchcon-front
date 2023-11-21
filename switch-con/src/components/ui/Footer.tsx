import { RiHome2Line } from 'react-icons/ri';
import { GiCardExchange } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='fixed bg-white w-[375px] shadow-sm'>
			<div className='flex justify-around text-sm font-semibold py-2'>
				<div className='flex flex-col items-center'>
					<RiHome2Line size={'20'} />
					<p>홈</p>
				</div>
				<div className='flex flex-col items-center ml-1'>
					<GiCardExchange size={'20'} />
					<p>교환</p>
				</div>
				<div className='flex flex-col items-center'>
					<FaRegUser size={'20'} />
					<p>내 교환</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
