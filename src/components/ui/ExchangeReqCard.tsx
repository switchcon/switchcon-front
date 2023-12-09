import React from 'react';

const ExchangeReqCard = ({
	gifticon,
	hoverOff,
	onClick,
	selected,
}: {
	gifticon: any;
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
    relative

  `;
	return (
		<section className={containerClassName} onClick={onClick}>
			<div className='flex flex-col w-3/5 gap-1'>
				<p className='font-semibold'>{gifticon.product}</p>
				<p className='font-medium text-stone-600'>
					{gifticon.category}/{gifticon.store}
				</p>

				<p className='text-sm font-semibold text-green-950'>{gifticon.expireDate}</p>
				<p className='text-sm font-semibold text-green-800'>약 {gifticon.price} 원</p>
			</div>
		</section>
	);
};

export default ExchangeReqCard;
