import { SlArrowLeft } from 'react-icons/sl';

interface HeaderProps {
	headline: string; // Header 작성할 내용
	navigaterOff?: boolean; // 뒤로가기 버튼 없앨 거면 props로 넘겨주면됨.
	children?: React.ReactNode; // Header 추가 이모티콘 필요할 시 자식props로 넘김
}
const Header = ({ headline, navigaterOff, children }: HeaderProps) => {
	return (
		<>
			<header className='fixed bg-white w-[375px] shadow-sm '>
				<div className='w-full flex justify-between flex-row pl-2 py-3 items-center'>
					{navigaterOff === undefined && <SlArrowLeft size='20' />}
					<div className='mx-2 text-lg font-bold'>{headline}</div>
					<div className='flex'>{children}</div>
				</div>
			</header>
		</>
	);
};
export default Header;
