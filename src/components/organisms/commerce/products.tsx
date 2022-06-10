import Article from '../../atoms/commerce/article'
import { Commerce } from '../../../interfaces/commerce'
import Card from '../../atoms/general/card'

export default function Products({ commerce } : {commerce : Commerce}) {
	return (
		<div className='grid grid-cols-3 articles'>
			{commerce.products.edges.map(ProductEdge => (
				<Card key={ProductEdge.node.id}>
					<Article 
						product={ProductEdge.node}
						commerce={commerce}
					/>
				</Card>
			))}
		</div>
	)		 
}