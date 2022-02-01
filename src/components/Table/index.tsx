import { useProducts } from '../../contexts/ProductsContext';
import './table.css';

const Table = () => {
    const { products } = useProducts();

    return (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>  

          {products.map((product, index) => (
            <tbody key={index}>
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>Link Editar</td>
                <td>Link Deletar</td>
              </tr>
            </tbody>
          ))}
          
        </table>
    )
}

export default Table;