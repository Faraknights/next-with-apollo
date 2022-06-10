import { Dispatch, SetStateAction, useState } from "react";

interface AsideProps{
	openAside: boolean;
	setOpenAside: Dispatch<SetStateAction<boolean>>;
}

import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

export default function Aside (options : AsideProps) {
	const {openAside, setOpenAside} = options
	const [translateX, setTranslateX] = useState("-translate-x-full")

	function useOutsideAlerter(ref) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setTranslateX("-translate-x-full")
					setTimeout(() => {
						setOpenAside(false)
					}, 100);
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useEffect(() => {
		setTranslateX("translate-x-0")
	}, [])
	

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

	return (
		<aside ref={wrapperRef} className={'bg-white transition duration-75 ease-linear fixed top-0 left-0 bottom-0 w-80 ' + translateX}>

		</aside>
	)
}