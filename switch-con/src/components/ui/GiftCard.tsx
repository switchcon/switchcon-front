import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const GiftCard = ({
	gifticon = {
		gifticon_img: '',
		product: '',
		category: '',
		store: '',
		expiration_date: '',
		price: 0,
	},
	children,
	hoverOff,
	onClick,
	selected,
	exchanged,
}: {
	gifticon?: any;
	children?: React.ReactNode;
	hoverOff?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	selected?: boolean;
	exchanged?: boolean;
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
      relative

  `;

	return (
		<section className={containerClassName} onClick={onClick}>
			<div className='w-2/5 mr-2 overflow-hidden rounded-md'>
				<AspectRatio.Root ratio={1 / 1}>
					<img src={gifticon.gifticonImg} className='object-cover w-full h-full' />
				</AspectRatio.Root>
			</div>
			<div className='flex flex-col w-3/5 gap-1'>
				<p className='font-semibold'>{gifticon.product}</p>
				<p className='font-medium text-stone-600'>
					{gifticon.category}/{gifticon.store}
				</p>
				<p className='text-sm font-semibold text-green-950'>{gifticon.expirationDdate}</p>
				<p className='text-sm font-semibold text-green-800'>약 {gifticon.price} 원</p>
				<div>{children}</div>
			</div>
			{exchanged && (
				<div className='absolute inset-0 flex items-center justify-center text-white bg-black rounded-md z-9 opacity-80 '>
					<p className='text-lg font-bold'>교환완료</p>
				</div>
			)}
		</section>
	);
};

export default GiftCard;
