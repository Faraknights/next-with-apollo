import { ReactNode } from "react";

interface TagProps{
	children: ReactNode;
}

export default function Tag (options : TagProps) {
	const {children} = options

	return (
		<div className="bg-primary-color px-3 text-sm text-white rounded-full flex items-center">
			{children}
		</div>
	)
}