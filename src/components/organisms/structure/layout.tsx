import { ReactNode } from 'react';
import Header from './header';

export default function Layout({children}: {children : ReactNode}) {
	return (
		<>
			<Header/>
			<main className="flex flex-col items-center grow w-full">
				{children}
			</main>
		</>
			
	)
}