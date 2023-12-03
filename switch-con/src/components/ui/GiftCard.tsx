import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const GiftCard = ({
	gifticon,
	children,
	hoverOff,
	onClick,
	selected,
}: {
	gifticon: any;
	children?: React.ReactNode;
	hoverOff?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	selected?: boolean;
}) => {
	const containerClassName = `
    w-full 
    ${hoverOff ? '' : 'hover:bg-slate-50 hover:ring hover:ring-[#44CD81] hover:ring-offset-0'} 
		${selected ? 'ring ring-[#44CD81] ring-offset-0' : ''}
    bg-white 
    rounded-md 
    px-4 
    py-3 
    flex 
    gap-2 
    shadow-md
		cursor-pointer
  `;

	return (
		<section className={containerClassName} onClick={onClick}>
			<div className='w-2/5 mr-2 overflow-hidden rounded-md'>
				<AspectRatio.Root ratio={1 / 1}>
					<img src={gifticon.gifticon_img} className='object-cover w-full h-full' />
				</AspectRatio.Root>
			</div>
			<div className='flex flex-col w-3/5 gap-1'>
				<p className='font-semibold'>{gifticon.product}</p>
				<p className='font-medium text-stone-600'>
					{gifticon.category}/{gifticon.store}
				</p>
				<p className='text-sm font-semibold text-green-950'>{gifticon.expiration_date}</p>
				<p className='text-sm font-semibold text-green-800'>약 {gifticon.price} 원</p>
				<div>{children}</div>
			</div>
		</section>
	);
};

export default GiftCard;
