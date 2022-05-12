
/**
 * Converti la valeur unit en une unité lisible
 * @param unit string
 * @returns libellé de l'unité
 */
const getUnitLabel = (unit: string) => {
    switch (unit) {
        case 'unit':
            return 'pièce'
        case 'gramme':
            return 'gramme'
    }
}

interface ArticleProps {
    price: string;
    unit: string;
    name: string;
    isBreton: boolean;
}

export default function article (options: ArticleProps){
    const {price, unit, name, isBreton} = options
    return (
        <>
            <div className='w-full pb-[100%] bg-[#DDD] rounded-2xl relative overflow-hidden mb-2'>
                {/* Image de base, pas d'image d'article actuellement */}
                <img 
                    className='w-6/12 absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] opacity-40'
                    src="https://img.icons8.com/material/344/picture--v1.png" alt="logo de base d'une image"
                />
                {/* Indicateur de prix de l'article */}
                <span className='absolute right-0 bottom-0 text-white px-2 bg-[#ff8c60] rounded-tl-md text-xs'>
                    {price}€/{getUnitLabel(unit)}
                </span>
            </div>
            <div className='flex'>
                {/* Nom du produit et indicateur breton */}
                { isBreton && (
                    <img className="w-5 mr-1" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Gwenn_ha_Du_%2811_mouchetures%29.svg"/>
                )}
                <span className=" overflow-hidden text-ellipsis">{name}</span>
            </div>
        </>
    )
}