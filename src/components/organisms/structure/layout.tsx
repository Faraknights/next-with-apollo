import { ReactNode } from 'react';
import Header from './header';

interface LayoutProps{
	children: ReactNode;
	title: string;
}

export default function Layout(options : LayoutProps) {
	const {children, title} = options
	return (
		<>
			<Header title={title}/>
			<main className="flex flex-col items-center grow w-full mt-16">
				{children}
			</main>
		</>
			
	)
}