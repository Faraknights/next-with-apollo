import Map from '../../atoms/commerce/map'

interface ContactProps {
	email: string;
	phone: string;
	address: string;
	map: boolean;
}

export default function Contact (options: ContactProps) {
	const {email, phone, address} = options
	return (
		<div className='grid grid-cols-2'>
			<Map/>
			<div className='flex flex-col'>
				<span className='font-medium'>Coordonnées</span>
				<span>{email}</span>
				<span>{phone}</span>
			</div>
			<div className='flex flex-col'>
				<span className='font-medium'>Adresse</span>
				<span>{address}</span>
			</div>
		</div>
	)
}