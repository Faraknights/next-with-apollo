import Map from '../../molecules/commerce/Map'

export default function contact (options) {
    const {email, phone, address, map} = options
    return (
        <div className='grid grid-cols-2'>
            <Map map={map}/>
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