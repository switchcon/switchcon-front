import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const GiftCard = ({ gifticon, children }: { gifticon: any; children?: React.ReactNode }) => {
	return (
		<section className='hover:bg-slate-50 hover:ring hover:ring-[#44CD81] hover:ring-offset-0 bg-white rounded-md px-4 py-3 flex gap-2 shadow-md'>
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
				<p>{children}</p>
			</div>
		</section>
	);
};

export default GiftCard;
