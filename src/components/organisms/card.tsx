import { ReactNode } from 'react';

export default function Card({children}: {children : ReactNode}) {
	return (
		<div className='m-5 p-3 bg-white rounded-xl h-fit'>
			{children}
		</div>
	)
}