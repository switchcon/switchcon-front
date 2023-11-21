import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const GiftCard = ({ gifticon }: { gifticon: any }) => {
	return (
		<section className='hover:bg-slate-50 hover:ring hover:ring-[#44CD81] hover:ring-offset-0 bg-white rounded-md px-4 py-3 flex gap-2 shadow-md'>
			<div className='w-[120px] rounded-md overflow-hidden mr-2'>
				<AspectRatio.Root ratio={1 / 1}>
					<img src={gifticon.gifticon_img} className='w-full h-full object-cover' />
				</AspectRatio.Root>
			</div>
			<div className='flex flex-col gap-1'>
				<p className='font-semibold'>{gifticon.product}</p>
				<p className='text-stone-600 font-medium'>
					{gifticon.category}/{gifticon.store}
				</p>
				<p className='text-green-950 font-semibold text-sm'>{gifticon.expiration_date}</p>
			</div>
		</section>
	);
};

export default GiftCard;
