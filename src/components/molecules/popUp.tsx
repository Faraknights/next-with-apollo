import { ReactNode } from 'react';

export default function PopUp({children}: {children : ReactNode}) {
	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center z-10'>
			<div className='bg-white p-4 rounded-lg'>
				{children}
			</div>
		</div>
	)
}