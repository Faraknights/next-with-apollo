import { Card } from '../../lib'
import Article from '../../atoms/commerce/article'

export interface ProductProps {
    node: {
        id: string;
        name: string; 
        price:string; 
        unit: string; 
        isBreton: boolean;
    }
}

export default function Product(options : {articles : Array<ProductProps>}) {
    console.log(options)
    const { articles: articleArray } = options;
    return (
        <div className='grid grid-cols-3 articles'>
            {articleArray.map((element : ProductProps) => (
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