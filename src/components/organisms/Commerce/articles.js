import { Card } from '../../lib'
import Article from '../../molecules/commerce/article'

export default function Articles(options) {
    const { articles : articleArray } = options;
    return (
        <div className='grid grid-cols-3 articles'>
            {articleArray.map(element => (
                <Card key={element.node.id}>
                    <Article 
                        name={element.node.name} 
                        price={element.node.price} 
                        unit={element.node.unit} 
                        isBreton={element.node.isBreton}
                    />
                </Card>
            ))}
        </div>
    )         
}