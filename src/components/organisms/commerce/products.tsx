import Article from '../../atoms/commerce/article'
import { Commerce, ProductNode } from '../../../interfaces/commerce'
import Card from '../card'

export default function Products({ commerce } : {commerce : Commerce}) {
	return (
		<div className='grid grid-cols-3 articles'>
			{commerce.products.edges.map((element : ProductNode) => (
				<Card key={element.node.id}>
					<Article 
						id={element.node.id}
						name={element.node.name} 
						price={element.node.price} 
						unit={element.node.unit} 
						isBreton={element.node.isBreton}
						commerce={commerce}
					/>
				</Card>
			))}
		</div>
	)		 
}