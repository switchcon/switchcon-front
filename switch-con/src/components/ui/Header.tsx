import { SlArrowLeft } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
interface HeaderProps {
	headline: string;
	navigaterOff?: boolean;
	children?: React.ReactNode;
}

const Header = ({ headline, navigaterOff, children }: HeaderProps) => {
	const navigate = useNavigate();
	return (
		<>
			<header className='fixed bg-white w-[375px] shadow-sm z-50'>
				<div className={`flex flex-row items-center ${navigaterOff ? 'justify-between' : ''} w-full py-3 pl-2`}>
					{!navigaterOff && (
						<button
							onClick={() => {
								navigate(-1);
							}}
						>
							<SlArrowLeft size='20' />
						</button>
					)}

					<div className='mx-2 text-lg font-bold'>{headline}</div>
					<div className='flex'>{children}</div>
				</div>
			</header>
		</>
	);
};

export default Header;
