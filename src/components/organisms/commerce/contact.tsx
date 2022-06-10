import { Address } from '../../../interfaces/map';
import Map from '../../atoms/commerce/map'

interface ContactProps {
	email: string;
	phone: string;
	address: Address;
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
				<span>{address.number} {address.route}</span>
				<span>{address.postalCode}, {address.city}</span>
			</div>
		</div>
	)
}