import { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
}

export default function Card(options : CardProps) {
	const {children, className} = options
	return (
		<div className={'m-5 p-3 bg-white rounded-xl h-fit shadow-lg ' + className}>
			{children}
		</div>
	)
}